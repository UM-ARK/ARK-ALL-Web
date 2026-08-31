export interface ClubSessionInfo {
    clubNum: string;
    expires_at: number;
}

const SESSION_MARKER = 'club_session';
const LEGACY_TOKEN_MARKER = 'club_token';

const cookieValue = (name: string): string => {
    if (typeof document === 'undefined') return '';
    const prefix = `${name}=`;
    const row = document.cookie.split('; ').find(part => part.startsWith(prefix));
    return row ? decodeURIComponent(row.slice(prefix.length)) : '';
};

const decodeJwtPayload = (token: string): { exp?: number; role?: string } | null => {
    try {
        const payload = token.split('.')[1];
        if (!payload) return null;
        const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
        const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
        return JSON.parse(atob(padded));
    } catch (_) {
        return null;
    }
};

const storedClubNum = (): string => {
    if (typeof window === 'undefined') return '';
    try {
        const stored = JSON.parse(localStorage.getItem(SESSION_MARKER) || '{}');
        return stored.clubNum ? String(stored.clubNum) : '';
    } catch (_) {
        return '';
    }
};

export const hasClubSessionMarker = () => Boolean(storedClubNum());

export const markClubSession = (clubNum: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(SESSION_MARKER, JSON.stringify({ clubNum: String(clubNum) }));
    // Older builds duplicated the JWT in localStorage; the cookie is sufficient.
    localStorage.removeItem(LEGACY_TOKEN_MARKER);
};

export const clearClubSession = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SESSION_MARKER);
    localStorage.removeItem(LEGACY_TOKEN_MARKER);
    document.cookie = 'ARK_TOKEN=; Max-Age=0; path=/; SameSite=Lax';
};

export const getValidClubSession = (fallbackClubNum = ''): ClubSessionInfo | null => {
    if (typeof window === 'undefined') return null;
    const clubNum = storedClubNum() || fallbackClubNum;
    const payload = decodeJwtPayload(cookieValue('ARK_TOKEN'));
    if (!clubNum || payload?.role !== 'club' || !payload.exp || payload.exp <= Date.now() / 1000) {
        return null;
    }
    return { clubNum: String(clubNum), expires_at: payload.exp };
};
