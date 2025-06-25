const mockBlogResponse = {
    data: {
        addactBlogs: [
            {
                HeadingSection: [{ BlogTag: null }],
                BlogBanner: [
                    {
                        BannerTitle: "test",
                        BannerDescription: "Test",
                        BannerImage: {
                            alternativeText: null,
                            height: 310,
                            width: 910,
                            formats: {
                                small: {
                                    url: "https://do7q3d8g8n6kn.cloudfront.net/small_dummy_1_Rf66w_Z8jjkh5r_LI_9_L_Sqj_Cw_ff38c6e562.webp",
                                    width: 500,
                                    height: 170,
                                },
                                medium: {
                                    url: "https://do7q3d8g8n6kn.cloudfront.net/medium_dummy_1_Rf66w_Z8jjkh5r_LI_9_L_Sqj_Cw_ff38c6e562.webp",
                                    width: 750,
                                    height: 255,
                                },
                            },
                            url: "https://do7q3d8g8n6kn.cloudfront.net/dummy_1_Rf66w_Z8jjkh5r_LI_9_L_Sqj_Cw_ff38c6e562.webp",
                        },
                    },
                ],
                BlogContent: [
                    { id: "2", Heading1: "testh1" },
                    { id: "3", Richtext: "<p>test</p>" },
                    {
                        id: "3",
                        Image: {
                            url: "https://do7q3d8g8n6kn.cloudfront.net/dummy_jdtest_efb3c9e817.png",
                            formats: {
                                small: {
                                    url: "https://do7q3d8g8n6kn.cloudfront.net/small_dummy_jdtest_efb3c9e817.png",
                                    width: 500,
                                    height: 500,
                                },
                            },
                            width: 512,
                            height: 512,
                        },
                    },
                    {
                        id: "5",
                        href: "/",
                        label: "Read Now",
                        target: "blank",
                        isExternal: false,
                    },
                    { id: "2", Heading2: "testh2" },
                    {
                        id: "4",
                        Image: {
                            url: "https://do7q3d8g8n6kn.cloudfront.net/dummy_1_Rf66w_Z8jjkh5r_LI_9_L_Sqj_Cw_ff38c6e562.webp",
                            formats: {
                                medium: {
                                    url: "https://do7q3d8g8n6kn.cloudfront.net/medium_dummy_1_Rf66w_Z8jjkh5r_LI_9_L_Sqj_Cw_ff38c6e562.webp",
                                    width: 750,
                                    height: 255,
                                },
                            },
                            width: 910,
                            height: 310,
                        },
                    },
                    { id: "4", Richtext: "<p>common data</p>" },
                    { id: "2", Heading5: "testh5" },
                ],
            },
        ],
    },
};

export default mockBlogResponse;
