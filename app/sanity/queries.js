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
    }
}`;
