export class CookieFilter {
    constructor(domains) {
        this.domains = domains;
    }

    filterDomainMatches(cookies) {
        return cookies.filter(cookie => this.matches(cookie));
    }

    filterDomainNotMatches(cookies) {
        return cookies.filter(cookie => !this.matches(cookie));
    }

    matches(cookie) {
        return this.domains.some(domain => domain.matches(cookie.domain));
    }
}
