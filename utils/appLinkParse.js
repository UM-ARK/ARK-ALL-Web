/**
 * 解析 ARK ALL Universal Link / App Link 路徑。
 *
 * 支援：
 *   /app/course/:courseCode
 *   /app/club/:clubNum
 *   /app/event/:eventId
 *   /app/team/:teamId?invite=
 *   /app/harbor/topic/:topicId/:postNumber?
 *   /app/wiki/:pageTitle+
 *
 * 「繼續在網頁查看」僅用於 harbor、wiki；課程不提供。
 *
 * @param {string[]|string|undefined} slug Next.js catch-all 參數
 * @param {{ invite?: string|string[] }|undefined} query URL query（如 invite）
 * @returns {null | {
 *   type: 'course'|'club'|'event'|'team'|'harbor'|'wiki',
 *   titleKey: string,
 *   titleParams: Record<string, string|number>,
 *   descKey: string,
 *   httpsPath: string,
 *   deepLink: string,
 *   webUrl?: string,
 * }}
 */

const DEEP_LINK_SCHEME = "one.umall://";
const HARBOR_TOPIC_WEB = "https://harbor.umall.one/t/topic/";
const WIKI_PAGE_WEB = "https://wiki.umall.one/wiki/";

function toSlugArray(slug) {
  if (!slug) return [];
  if (Array.isArray(slug)) return slug.filter(Boolean).map(String);
  return String(slug)
    .split("/")
    .filter(Boolean);
}

function firstQueryValue(value) {
  if (value == null) return "";
  const raw = Array.isArray(value) ? value[0] : value;
  return raw == null ? "" : String(raw);
}

function buildDeepLink(httpsPath) {
  return `${DEEP_LINK_SCHEME}${httpsPath.replace(/^\//, "")}`;
}

/**
 * @param {string[]|string|undefined} slug
 * @param {{ invite?: string|string[] }|undefined} query
 */
export function parseAppPath(slug, query) {
  const parts = toSlugArray(slug);
  if (parts.length === 0) return null;

  // course/:courseCode
  if (parts[0] === "course" && parts.length === 2 && parts[1]) {
    const courseCode = parts[1].toUpperCase();
    const httpsPath = `/app/course/${courseCode}`;
    return {
      type: "course",
      titleKey: "App_link_course_title",
      titleParams: { code: courseCode },
      descKey: "App_link_course_desc",
      httpsPath,
      deepLink: buildDeepLink(httpsPath),
    };
  }

  // club/:clubNum
  if (parts[0] === "club" && parts.length === 2 && parts[1]) {
    const clubNum = parts[1];
    const httpsPath = `/app/club/${clubNum}`;
    return {
      type: "club",
      titleKey: "App_link_club_title",
      titleParams: { id: clubNum },
      descKey: "App_link_club_desc",
      httpsPath,
      deepLink: buildDeepLink(httpsPath),
    };
  }

  // event/:eventId
  if (parts[0] === "event" && parts.length === 2 && parts[1]) {
    const eventId = parts[1];
    const httpsPath = `/app/event/${eventId}`;
    return {
      type: "event",
      titleKey: "App_link_event_title",
      titleParams: { id: eventId },
      descKey: "App_link_event_desc",
      httpsPath,
      deepLink: buildDeepLink(httpsPath),
    };
  }

  // team/:teamId?invite=
  if (parts[0] === "team" && parts.length === 2 && parts[1]) {
    const teamId = parts[1];
    const invite = firstQueryValue(query?.invite);
    const httpsPath = invite
      ? `/app/team/${encodeURIComponent(teamId)}?invite=${encodeURIComponent(invite)}`
      : `/app/team/${encodeURIComponent(teamId)}`;
    return {
      type: "team",
      titleKey: invite ? "App_link_team_invite_title" : "App_link_team_title",
      titleParams: { id: teamId },
      descKey: invite ? "App_link_team_invite_desc" : "App_link_team_desc",
      httpsPath,
      deepLink: buildDeepLink(httpsPath),
    };
  }

  // harbor/topic/:topicId/:postNumber?
  if (
    parts[0] === "harbor" &&
    parts[1] === "topic" &&
    parts.length >= 3 &&
    parts.length <= 4 &&
    parts[2]
  ) {
    const topicId = parts[2];
    const postNumber = parts[3];
    const httpsPath = postNumber
      ? `/app/harbor/topic/${topicId}/${postNumber}`
      : `/app/harbor/topic/${topicId}`;
    return {
      type: "harbor",
      titleKey: postNumber
        ? "App_link_harbor_title_post"
        : "App_link_harbor_title",
      titleParams: {
        id: topicId,
        ...(postNumber ? { post: postNumber } : {}),
      },
      descKey: "App_link_harbor_desc",
      httpsPath,
      deepLink: buildDeepLink(httpsPath),
      webUrl: postNumber
        ? `${HARBOR_TOPIC_WEB}${encodeURIComponent(topicId)}/${encodeURIComponent(postNumber)}`
        : `${HARBOR_TOPIC_WEB}${encodeURIComponent(topicId)}`,
    };
  }

  // wiki/:pageTitle+
  if (parts[0] === "wiki" && parts.length >= 2) {
    const rawSegments = parts.slice(1);
    const pageTitle = rawSegments
      .map((segment) => {
        try {
          return decodeURIComponent(segment);
        } catch {
          return segment;
        }
      })
      .join("/");
    if (!pageTitle) return null;

    const httpsPath = `/app/wiki/${rawSegments
      .map((s) => encodeURIComponent(s))
      .join("/")}`;
    const displayTitle = pageTitle.replace(/_/g, " ");
    const wikiTitleForUrl = pageTitle.replace(/ /g, "_");

    return {
      type: "wiki",
      titleKey: "App_link_wiki_title",
      titleParams: { title: displayTitle },
      descKey: "App_link_wiki_desc",
      httpsPath,
      deepLink: buildDeepLink(httpsPath),
      webUrl: `${WIKI_PAGE_WEB}${encodeURIComponent(wikiTitleForUrl)}`,
    };
  }

  return null;
}

/**
 * 產生給爬蟲／分享卡用的中文 SEO 文案（不依賴客戶端 i18n）。
 * @param {ReturnType<typeof parseAppPath>} link
 */
export function getAppLinkSeoCopy(link) {
  if (!link) {
    return {
      displayTitle: "連結無效",
      seoTitle: "連結無效 · ARK ALL",
      seoDescription: "此 ARK ALL 連結無效或不完整。你仍可下載 App。",
    };
  }

  const p = link.titleParams || {};
  switch (link.type) {
    case "course":
      return {
        displayTitle: `課程 ${p.code}`,
        seoTitle: `課程 ${p.code} · ARK ALL`,
        seoDescription: "在 ARK ALL 查看課程資料、班別與時間。",
      };
    case "club":
      return {
        displayTitle: `社團 ${p.id}`,
        seoTitle: `社團 ${p.id} · ARK ALL`,
        seoDescription: "在 ARK ALL 查看此社團主頁與活動。",
      };
    case "event":
      return {
        displayTitle: `活動 ${p.id}`,
        seoTitle: `活動 ${p.id} · ARK ALL`,
        seoDescription: "在 ARK ALL 查看活動詳情。",
      };
    case "team":
      if (link.descKey === "App_link_team_invite_desc") {
        return {
          displayTitle: "團隊邀請",
          seoTitle: "團隊邀請 · ARK ALL",
          seoDescription: "在 ARK ALL 接受邀請並加入此團隊。",
        };
      }
      return {
        displayTitle: `團隊 ${p.id}`,
        seoTitle: `團隊 ${p.id} · ARK ALL`,
        seoDescription: "在 ARK ALL 查看此團隊。",
      };
    case "harbor":
      return {
        displayTitle: p.post
          ? `職涯港話題 ${p.id} · #${p.post}`
          : `職涯港話題 ${p.id}`,
        seoTitle: p.post
          ? `職涯港話題 ${p.id} · #${p.post} · ARK ALL`
          : `職涯港話題 ${p.id} · ARK ALL`,
        seoDescription: "在 ARK ALL 開啟此職涯港討論。",
      };
    case "wiki":
      return {
        displayTitle: `Wiki · ${p.title}`,
        seoTitle: `${p.title} · ARK Wiki`,
        seoDescription: "在網頁或 ARK ALL 閱讀此 Wiki 條目。",
      };
    default:
      return {
        displayTitle: "ARK ALL",
        seoTitle: "ARK ALL",
        seoDescription: "澳門大學校園資訊 APP",
      };
  }
}

export { DEEP_LINK_SCHEME, buildDeepLink };
