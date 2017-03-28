
class CookieFilter {
    constructor(domains) {
        this.domains = domains;
    }

    *filterDomainMatches(cookies) {
        for (let cookie of cookies) {
            if (this.matches(cookie)) {
                yield cookie;
            }
        }
    }

    *filterDomainNotMatches(cookies) {
        for (let cookie of cookies) {
            if (! this.matches(cookie)) {
                yield cookie;
            }
        }
    }

    matches(cookie) {
        return this.domains.some((domain) => {
            return domain.matches(cookie.domain);
        });
    }
}

exports.CookieFilter = CookieFilter;
