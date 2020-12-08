module.exports = {
    title: 'BrightLian面试指南',  // 设置网站标题
    description : '连明亮面试题库',
    themeConfig: {
        head: [
            ['link', { rel: 'icon', href: 'icon/favicon.png' }]
        ],
        logo: '/icon/favicon.png',
        nav: [
            { text: '首页', link: '/' },
            { text: '指南', link: '/HTML/HTML' },
        ],
        sidebarDepth: 2,
        displayAllHeaders: false,
        editLinks: true,
        docsBranch: 'master',
        sidebar: [
            {
                title: 'HTML 相关',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/HTML/HTML.md'
                ]
            },
            {
                title: 'CSS 相关',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/CSS/CSSBasicKnowledge.md',
                    '/CSS/CSSWrite.md',
                ]
            },
            {
                title: 'JS 相关',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/JS/JSDataType.md',
                    '/JS/JSExecute.md',
                    '/JS/JSPrototype.md',
                    '/JS/JSScope.md',
                    '/JS/JSAsync.md',
                    '/JS/JSBasicKnowledge.md',
                    '/JS/JSWrite.md',
                ]
            },
            {
                title: '浏览器相关',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/browser/browserBasicKnowledge.md',
                ]
            },
            {
                title: 'DOM 相关',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/DOM/DOMBasicKnowledge.md',
                ]
            },
            {
                title: 'BOM 相关',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/BOM/BOMBasicKnowledge.md',
                ]
            },
            {
                title: '计算机基础',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/network/HTTP.md',
                    '/network/TCP.md',
                    '/network/cache.md',
                    '/network/networkBasicKnowledge.md',
                ]
            },
            {
                title: '前端算法',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/algorithm/algorithm.md',
                ]
            },
            {
                title: '前端框架',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/frame/vueUse.md',
                    '/frame/vueAdvanced.md',
                    '/frame/vueTheory.md',
                    '/frame/vueRouter.md',
                    '/frame/vueX.md',
                    '/frame/react.md',
                    '/frame/frameTheory.md',
                ]
            },
            {
                title: '性能优化',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/performance/optimize.md',
                ]
            },
            {
                title: '前端工程化',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/module/git.md',
                    '/module/webpack.md',
                    '/module/other.md',
                ]
            },
            {
                title: '前端安全',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/safety/safety.md',
                ]
            },
            {
                title: 'node 相关',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/node/node.md',
                ]
            },
            {
                title: '开放性问题',   // 标题：必要的
                collapsable: true, // 展开侧边栏： 可选的, 默认值是 true,
                sidebarDepth: 2,    // 侧边栏深度：可选的, 默认值是 1
                children: [
                    '/openEnded/openEnded.md',
                ]
            }
        ]
    }
};
