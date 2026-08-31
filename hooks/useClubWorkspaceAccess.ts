import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import { useLoginStore } from '../states/state';
import {
    clearClubSession,
    getValidClubSession,
    hasClubSessionMarker,
    markClubSession,
} from '../lib/clubSession';
import { getClubManagementCopy } from '../utils/clubManagementCopy';

export const useClubWorkspaceAccess = () => {
    const router = useRouter();
    const { i18n } = useTranslation();
    const copy = getClubManagementCopy(i18n.resolvedLanguage);
    const clubNum = useLoginStore(state => state.curID);
    const setLogin = useLoginStore(state => state.setLogin);
    const clearLogin = useLoginStore(state => state.clearLogin);
    const [hasSessionCandidate, setHasSessionCandidate] = useState(Boolean(clubNum));

    useEffect(() => {
        setHasSessionCandidate(Boolean(clubNum) || hasClubSessionMarker());
    }, [clubNum]);

    const openClubWorkspace = async () => {
        if (!hasSessionCandidate) {
            await router.push('/clubsignin');
            return;
        }

        const session = getValidClubSession(clubNum);
        if (session) {
            markClubSession(session.clubNum);
            setLogin(session.clubNum, '');
            await router.push('/club/clubInfo');
        } else {
            clearClubSession();
            clearLogin();
            setHasSessionCandidate(false);
            toast.error(copy.sessionExpired);
            await router.push('/clubsignin');
        }
    };

    return {
        hasSessionCandidate,
        openClubWorkspace,
        workspaceLabel: copy.workspace,
    };
};
