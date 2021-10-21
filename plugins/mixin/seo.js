const seo = {
    computed: {},
    methods: {
        $initHead(title, description, keywords, addr = '') {
            let metaArr = [],
                linkArr = [];
            if (addr) {
                (metaArr = [
                    {
                        hid: 'hid',
                        name: 'mobile-agent',
                        content: 'format=wml; url=//m.duhaoju.com' + addr
                    },
                    {
                        name: 'mobile-agent',
                        content: 'format=xhtml; url=//m.duhaoju.com' + addr
                    },
                    {
                        name: 'mobile-agent',
                        content: 'format=html5; url=//m.duhaoju.com' + addr
                    }
                ]),
                    (linkArr = [
                        {
                            rel: 'alternate',
                            media: 'only screen and (max-width: 640px)',
                            href: '//m.duhaoju.com' + addr
                        },
                        { rel: 'canonical', href: 'https//www.duhaoju.com' + addr }
                    ]);
            }
            return {
                title: title,
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: description.slice(0, 100)
                    },
                    {
                        hid: 'keywords',
                        name: 'keywords',
                        content: keywords
                    }
                ].concat(metaArr),
                link: linkArr
            };
        }
    }
};
export default seo;
