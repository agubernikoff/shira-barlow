export const HOME_QUERY =
  "*[_type == 'home'][0]{...,heroImages[]{...,asset->{url}}}";

export const SETTINGS_QUERY = `*[_type == "settings"][0]{
    ...,
    header {
        ...,
        logo {
            ...,
            asset->{
                url
            }
        },
        menu {
            ...,
            links[] {
                ...,
                reference->{
                    _id,
                    _type,
                    title,
                    "slug": slug.current
                }
            }
        }
    },
    pagesSideNav {
        ...,
        links[] {
            ...,
            reference->{
            _id,
            _type,
            title,
            "slug": slug.current
            }
        }
    },
    evenBetterHero{
        ...,
        images[]{
            ...,
            image{
                ...,
                asset->{
                    ...,
                    url
                }
            }
        }
    }
}`;

export const SANITY_PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
    ...,
    "slug": slug.current
  }`;

export const EVEN_BETTER_QUERY = `*[_type == 'evenBetter'][0]{
    ...,
    logo{
        ...,
        asset->{
            ...,
            url
        }
    }
}`;
