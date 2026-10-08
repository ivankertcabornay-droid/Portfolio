import { supabase, isSupabaseReady } from './supabaseClient';

const STORAGE_KEY = 'portfolio_store';

const buildId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `portfolio-${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

const readLocalPortfolios = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeLocalPortfolios = (items) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

const asStringList = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object') {
          return item.school || item.degree || item.institution || item.name || item.company || item.role || item.title || item.label || '';
        }
        return '';
      })
      .filter(Boolean);
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

export const normalizePortfolio = (portfolio = {}) => {
  const education = asStringList(portfolio.education || portfolio.educational_background || []);

  const skills = Array.isArray(portfolio.skills)
    ? portfolio.skills.filter(Boolean)
    : String(portfolio.skills || '')
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean);

  const projects = Array.isArray(portfolio.projects)
    ? portfolio.projects.map((project) => ({
        title: project?.title || '',
        description: project?.description || '',
      }))
    : [{ title: '', description: '' }];

  const workExperience = Array.isArray(portfolio.work_experience)
    ? portfolio.work_experience.map((item) => ({
        role: item?.role || item?.title || '',
        company: item?.company || '',
        description: item?.description || '',
      }))
    : [{ role: '', company: '', description: '' }];

  const socialLinks = Array.isArray(portfolio.social_links)
    ? portfolio.social_links.map((link) => ({
        label: link?.label || 'Website',
        url: link?.url || '',
      }))
    : portfolio.social_links && typeof portfolio.social_links === 'object'
      ? Object.entries(portfolio.social_links)
          .filter(([, value]) => value)
          .map(([key, value]) => ({ label: key, url: value }))
      : [];

  if (portfolio.github_link && !socialLinks.some((link) => link.url === portfolio.github_link)) {
    socialLinks.push({ label: 'GitHub', url: portfolio.github_link });
  }

  if (portfolio.linkedin_link && !socialLinks.some((link) => link.url === portfolio.linkedin_link)) {
    socialLinks.push({ label: 'LinkedIn', url: portfolio.linkedin_link });
  }

  return {
    id: portfolio.id || buildId(),
    template: portfolio.template || 'simple',
    full_name: portfolio.full_name || '',
    profile_picture_url: portfolio.profile_picture_url || '',
    email: portfolio.email || '',
    contact_number: portfolio.contact_number || '',
    address: portfolio.address || '',
    about_me: portfolio.about_me || '',
    education,
    skills,
    projects,
    work_experience: workExperience,
    social_links: socialLinks,
    created_at: portfolio.created_at || new Date().toISOString(),
    github_link: portfolio.github_link || '',
    linkedin_link: portfolio.linkedin_link || '',
  };
};

export const getRawPortfolios = async () => {
  if (isSupabaseReady && supabase) {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data || [];
  }

  return readLocalPortfolios();
};

export const getPortfolios = async () => {
  const rawPortfolios = await getRawPortfolios();
  return rawPortfolios.map(normalizePortfolio);
};

export const getPortfolio = async (id) => {
  if (!id) return null;

  if (isSupabaseReady && supabase) {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(error.message);
    }

    return data ? normalizePortfolio(data) : null;
  }

  const stored = readLocalPortfolios();
  const found = stored.find((portfolio) => String(portfolio.id) === String(id));
  return found ? normalizePortfolio(found) : null;
};

export const savePortfolio = async (portfolio) => {
  const normalized = normalizePortfolio(portfolio);

  if (isSupabaseReady && supabase) {
    const row = {
      ...normalized,
      id: normalized.id,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('portfolios')
      .upsert([row], { onConflict: 'id' })
      .select();

    if (error) {
      throw new Error(error.message);
    }

    return normalizePortfolio(data?.[0] || row);
  }

  const stored = readLocalPortfolios();
  const index = stored.findIndex((item) => String(item.id) === String(normalized.id));

  if (index >= 0) {
    stored[index] = normalized;
  } else {
    stored.push(normalized);
  }

  writeLocalPortfolios(stored);
  return normalized;
};

export const deletePortfolio = async (id) => {
  if (isSupabaseReady && supabase) {
    const { error } = await supabase.from('portfolios').delete().eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return true;
  }

  const stored = readLocalPortfolios().filter((portfolio) => String(portfolio.id) !== String(id));
  writeLocalPortfolios(stored);
  return true;
};
