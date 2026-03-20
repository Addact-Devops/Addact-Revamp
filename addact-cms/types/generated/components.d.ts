import type { Schema, Struct } from '@strapi/strapi';

export interface AddactComponentAboutusContent extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_aboutus_contents';
  info: {
    displayName: 'AboutusContent';
  };
  attributes: {
    Description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    SubTitle: Schema.Attribute.Text;
    Title: Schema.Attribute.Text;
  };
}

export interface AddactComponentClientTestimonialItems
  extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_client_testimonial_items';
  info: {
    displayName: 'TestimonialItems';
  };
  attributes: {
    author_name: Schema.Attribute.String;
    author_position: Schema.Attribute.String;
    quote: Schema.Attribute.Blocks;
    rating: Schema.Attribute.Enumeration<
      ['star1', 'star2', 'star3', 'star4', 'star5']
    >;
  };
}

export interface AddactComponentContactFormBlock
  extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_contact_form_blocks';
  info: {
    displayName: 'ContactFormBlock';
  };
  attributes: {
    LeftBackgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    LeftDescription: Schema.Attribute.Blocks;
    LeftTitle: Schema.Attribute.String;
    RecipientEmails: Schema.Attribute.Text;
    RightDescription: Schema.Attribute.Blocks;
    RightTitle: Schema.Attribute.String;
  };
}

export interface AddactComponentContactUsAddress
  extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_contact_us_addresses';
  info: {
    displayName: 'ContactUSAddress';
  };
  attributes: {
    Address: Schema.Attribute.Text;
    ContactUsEmailPhone: Schema.Attribute.Component<
      'addact-component.contact-us-email-phone-links',
      true
    >;
    MapIframe: Schema.Attribute.Blocks;
    OfficeCity: Schema.Attribute.String;
    OfficeCountry: Schema.Attribute.String;
  };
}

export interface AddactComponentContactUsDaysOnlineOffline
  extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_contact_us_days_online_offline_s';
  info: {
    displayName: 'ContactUsDays(Online/Offline)';
  };
  attributes: {
    Availability: Schema.Attribute.String;
    Days: Schema.Attribute.String;
  };
}

export interface AddactComponentContactUsEmailPhoneLinks
  extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_contact_us_email_phone_links';
  info: {
    displayName: 'ContactUSEmailPhoneLinks';
  };
  attributes: {
    Label: Schema.Attribute.String;
    Link: Schema.Attribute.String;
  };
}

export interface AddactComponentContentWithNumber
  extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_content_with_numbers';
  info: {
    displayName: 'Content With Number';
  };
  attributes: {
    NumberTitleContent: Schema.Attribute.Component<
      'reuse.number-title-content',
      true
    >;
    Title: Schema.Attribute.Text;
  };
}

export interface AddactComponentGallery extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_galleries';
  info: {
    displayName: 'GalleryImageItem';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files'> &
      Schema.Attribute.Required;
    Year: Schema.Attribute.Integer;
  };
}

export interface AddactComponentGalleryTitles extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_gallery_titles';
  info: {
    displayName: 'GalleryTitles';
  };
  attributes: {
    SubTitle: Schema.Attribute.String;
    Title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface AddactComponentImages extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_images';
  info: {
    displayName: 'Images';
  };
  attributes: {};
}

export interface AddactComponentOurPartners extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_our_partners';
  info: {
    displayName: 'OurPartners';
    icon: 'connector';
  };
  attributes: {
    PartnerImages: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Title: Schema.Attribute.String;
  };
}

export interface AddactComponentQuote extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_quotes';
  info: {
    displayName: 'Quote';
  };
  attributes: {
    AuthorImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    AuthorMessage: Schema.Attribute.Text;
    AuthorName: Schema.Attribute.Text;
  };
}

export interface AddactComponentVideoBlock extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_video_blocks';
  info: {
    displayName: 'VideoBlock';
  };
  attributes: {
    Content: Schema.Attribute.Component<
      'base-template.title-with-description',
      false
    >;
    Iframe: Schema.Attribute.Component<'base-template.richtext', false>;
  };
}

export interface AddactComponentVisionMission extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_vision_missions';
  info: {
    displayName: 'VisionMission';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    SubTitle: Schema.Attribute.Text;
    Title: Schema.Attribute.Text;
  };
}

export interface AddactComponentWeAreAddact extends Struct.ComponentSchema {
  collectionName: 'components_addact_component_we_are_addacts';
  info: {
    displayName: 'We Are Addact';
  };
  attributes: {
    Content: Schema.Attribute.Blocks;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    NumberContent: Schema.Attribute.Component<
      'shared.number-value-counter',
      true
    >;
    SubTitle: Schema.Attribute.Text;
    Title: Schema.Attribute.Text;
  };
}

export interface AuthorAuthor extends Struct.ComponentSchema {
  collectionName: 'components_author_authors';
  info: {
    displayName: 'Author';
    icon: 'walk';
  };
  attributes: {
    AuthorDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    AuthorImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    AuthorName: Schema.Attribute.String & Schema.Attribute.Unique;
    designation: Schema.Attribute.Relation<
      'oneToOne',
      'api::author-designation.author-designation'
    >;
  };
}

export interface BannerBanner extends Struct.ComponentSchema {
  collectionName: 'components_banner_banners';
  info: {
    displayName: 'Banner';
    icon: 'book';
  };
  attributes: {
    BannerDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    BannerImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    BannerLink: Schema.Attribute.Component<'shared.link', false>;
    BannerLogo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    BannerTitle: Schema.Attribute.String;
    chipsText: Schema.Attribute.Component<'base-template.title', true>;
    isTextAlignCenter: Schema.Attribute.Boolean;
    isVideo: Schema.Attribute.Boolean;
    show_searchbox: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    videoLink: Schema.Attribute.String;
  };
}

export interface BannerEventBanner extends Struct.ComponentSchema {
  collectionName: 'components_banner_event_banners';
  info: {
    displayName: 'EventBanner';
  };
  attributes: {
    EventType: Schema.Attribute.String;
    HeroBanner: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface BaseTemplateBaseHeading extends Struct.ComponentSchema {
  collectionName: 'components_base_template_base_headings';
  info: {
    displayName: 'BaseHeading';
    icon: 'apps';
  };
  attributes: {
    PageTitle: Schema.Attribute.String;
    Slug: Schema.Attribute.String;
  };
}

export interface BaseTemplateCommonSection extends Struct.ComponentSchema {
  collectionName: 'components_base_template_common_sections';
  info: {
    displayName: 'CommonSection';
    icon: 'book';
  };
  attributes: {
    PageTitle: Schema.Attribute.String;
  };
}

export interface BaseTemplateGlobeAnimation extends Struct.ComponentSchema {
  collectionName: 'components_base_template_globe_animations';
  info: {
    displayName: 'GlobeAnimation';
    icon: 'magic';
  };
  attributes: {
    Locations: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
    Video: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface BaseTemplateLinkImage extends Struct.ComponentSchema {
  collectionName: 'components_base_template_link_images';
  info: {
    description: '';
    displayName: 'LinkImage';
  };
  attributes: {
    ClassName: Schema.Attribute.Enumeration<
      [
        'facebook-icon',
        'instagram-icon',
        'twitter-icon',
        'linkedin-icon',
        'social-open',
        'social-close',
        'sitecore-bg',
        'umbraco-bg',
        'strapi-bg',
        'kentico-bg',
        'contentstack-bg',
        'contentful-bg',
      ]
    >;
    HoverIcon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Icons: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Links: Schema.Attribute.Component<'shared.link', false>;
    Title: Schema.Attribute.String;
  };
}

export interface BaseTemplatePromo extends Struct.ComponentSchema {
  collectionName: 'components_base_template_promos';
  info: {
    displayName: 'Promo';
    icon: 'book';
  };
  attributes: {
    Description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Link: Schema.Attribute.Component<'shared.link', false>;
    sub_service_page: Schema.Attribute.Relation<
      'oneToOne',
      'api::sub-service-page.sub-service-page'
    >;
    Title: Schema.Attribute.String;
  };
}

export interface BaseTemplateRichtext extends Struct.ComponentSchema {
  collectionName: 'components_base_template_richtexts';
  info: {
    displayName: 'Richtext';
    icon: 'book';
  };
  attributes: {
    Richtext: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface BaseTemplateTitle extends Struct.ComponentSchema {
  collectionName: 'components_base_template_titles';
  info: {
    displayName: 'Title';
    icon: 'briefcase';
  };
  attributes: {
    Title: Schema.Attribute.String;
  };
}

export interface BaseTemplateTitleTag extends Struct.ComponentSchema {
  collectionName: 'components_base_template_title_tags';
  info: {
    displayName: 'TitleTag';
    icon: 'bulletList';
  };
  attributes: {
    CategoryTitle: Schema.Attribute.String;
  };
}

export interface BaseTemplateTitleWithDescription
  extends Struct.ComponentSchema {
  collectionName: 'components_base_template_title_with_descriptions';
  info: {
    displayName: 'TitleWithDescription';
  };
  attributes: {
    Description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    Link: Schema.Attribute.Component<'shared.link', false>;
    Title: Schema.Attribute.String;
  };
}

export interface BlogHeroBannerBlogHeroBanner extends Struct.ComponentSchema {
  collectionName: 'components_blog_hero_banner_blog_hero_banners';
  info: {
    displayName: 'BlogHeroBanner';
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::author.author'>;
    BannerDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultMarkdown';
        }
      >;
    BannerImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    BannerTitle: Schema.Attribute.String;
    blogcategory: Schema.Attribute.Relation<
      'oneToOne',
      'api::blog-category.blog-category'
    >;
    eventLocation: Schema.Attribute.String;
    PublishDate: Schema.Attribute.Date;
    ReadNow: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface CardCard extends Struct.ComponentSchema {
  collectionName: 'components_card_cards';
  info: {
    displayName: 'Card';
    icon: 'grid';
  };
  attributes: {
    BgImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    CardDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultMarkdown';
        }
      >;
    CardLink: Schema.Attribute.Component<'shared.link', false>;
    CardTitle: Schema.Attribute.String;
  };
}

export interface CardsdataCard extends Struct.ComponentSchema {
  collectionName: 'components_card_cardsdata';
  info: {
    displayName: 'Card';
    icon: 'grid';
  };
  attributes: {
    CardDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultMarkdown';
        }
      >;
    CardLink: Schema.Attribute.Component<'shared.link', false>;
    CardTitle: Schema.Attribute.String;
  };
}

export interface ContactUsComponentDayStatus extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_component_day_statuses';
  info: {
    displayName: 'day-status';
  };
  attributes: {
    activeStatus: Schema.Attribute.String;
    day_range: Schema.Attribute.String;
  };
}

export interface ContactUsComponentOfficeLocation
  extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_component_office_locations';
  info: {
    displayName: 'office-location';
  };
  attributes: {
    address: Schema.Attribute.Blocks;
    city: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    label: Schema.Attribute.String;
    map_iframe: Schema.Attribute.Text;
    phone: Schema.Attribute.String;
  };
}

export interface ContactUsComponentTitleSubTitelAndImage
  extends Struct.ComponentSchema {
  collectionName: 'components_contact_us_component_title_sub_titel_and_images';
  info: {
    displayName: 'Title SubTitel And Image';
  };
  attributes: {
    dayStatus: Schema.Attribute.Component<
      'contact-us-component.day-status',
      true
    >;
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subTitel: Schema.Attribute.Text;
    titel: Schema.Attribute.Text;
  };
}

export interface CounterCounter extends Struct.ComponentSchema {
  collectionName: 'components_counter_counters';
  info: {
    displayName: 'Counter';
    icon: 'globe';
  };
  attributes: {
    CounterTitle: Schema.Attribute.String;
    NumberCount: Schema.Attribute.Decimal;
  };
}

export interface HeadingsH1 extends Struct.ComponentSchema {
  collectionName: 'components_heading_section_h1s';
  info: {
    displayName: 'h1';
    icon: 'bulletList';
  };
  attributes: {
    h1: Schema.Attribute.String;
  };
}

export interface HeadingsH2 extends Struct.ComponentSchema {
  collectionName: 'components_heading_section_h2s';
  info: {
    displayName: 'h2';
  };
  attributes: {
    h2: Schema.Attribute.String;
  };
}

export interface HeadingsH3 extends Struct.ComponentSchema {
  collectionName: 'components_heading_section_h3s';
  info: {
    displayName: 'h3';
  };
  attributes: {
    h3: Schema.Attribute.String;
  };
}

export interface HeadingsH4 extends Struct.ComponentSchema {
  collectionName: 'components_heading_section_h4s';
  info: {
    displayName: 'h4';
  };
  attributes: {
    h5: Schema.Attribute.String;
  };
}

export interface HeadingsH5 extends Struct.ComponentSchema {
  collectionName: 'components_heading_section_h5s';
  info: {
    displayName: 'h5';
  };
  attributes: {
    h5: Schema.Attribute.String;
  };
}

export interface HeadingsH6 extends Struct.ComponentSchema {
  collectionName: 'components_heading_section_h6s';
  info: {
    displayName: 'h6';
  };
  attributes: {
    h6: Schema.Attribute.String;
  };
}

export interface HomeAiCard extends Struct.ComponentSchema {
  collectionName: 'components_home_ai_cards';
  info: {
    displayName: 'AI Card';
  };
  attributes: {
    serviceList: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-card.service-card'
    >;
    title: Schema.Attribute.String;
  };
}

export interface HomeAiEcoSystem extends Struct.ComponentSchema {
  collectionName: 'components_home_ai_eco_systems';
  info: {
    displayName: 'AI Eco System';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultMarkdown';
        }
      >;
    firstImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    firstLayerlogos: Schema.Attribute.Component<'shared.image', true>;
    link: Schema.Attribute.Component<'shared.link', false>;
    secondImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    secondLayerlogos: Schema.Attribute.Component<'shared.image', true>;
    tagLine: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface HomeAiOurServices extends Struct.ComponentSchema {
  collectionName: 'components_home_ai_our_services';
  info: {
    displayName: 'AI Our Services';
  };
  attributes: {
    listingContext: Schema.Attribute.Component<'home.base-component', false>;
    serviceList: Schema.Attribute.Relation<
      'oneToMany',
      'api::ai-services-detail.ai-services-detail'
    >;
  };
}

export interface HomeAiSolveProblem extends Struct.ComponentSchema {
  collectionName: 'components_home_ai_solve_problems';
  info: {
    displayName: 'AI Solve Problem';
  };
  attributes: {
    aiSolveProblemList: Schema.Attribute.Relation<
      'oneToMany',
      'api::ai-solve-problem-list.ai-solve-problem-list'
    >;
    title: Schema.Attribute.String;
  };
}

export interface HomeAiSolveProblemCard extends Struct.ComponentSchema {
  collectionName: 'components_home_ai_solve_problem_cards';
  info: {
    displayName: 'AI Solve Problem Card';
  };
  attributes: {
    bgImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeAnimationBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_animation_banners';
  info: {
    displayName: 'Animation Banner';
  };
  attributes: {
    animationTitle: Schema.Attribute.String;
    bannerDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultMarkdown';
        }
      >;
    bannerImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    bannerLink: Schema.Attribute.Component<'shared.link', false>;
    bannerSubTitle: Schema.Attribute.Component<'base-template.title', true>;
    bannerTitle: Schema.Attribute.String;
    firstAnimationImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    secondAnimationImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface HomeBaseComponent extends Struct.ComponentSchema {
  collectionName: 'components_home_base_components';
  info: {
    displayName: 'Base Component';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface HomeCapabilities extends Struct.ComponentSchema {
  collectionName: 'components_home_capabilities';
  info: {
    displayName: 'Capabilities';
  };
  attributes: {
    description: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultMarkdown';
        }
      >;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    sublinks: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface HomeCardVariant extends Struct.ComponentSchema {
  collectionName: 'components_home_card_variants';
  info: {
    displayName: 'cardVariant';
  };
  attributes: {
    variant: Schema.Attribute.Enumeration<['twoCard', 'threeCard', 'fourCard']>;
  };
}

export interface HomeCmsListing extends Struct.ComponentSchema {
  collectionName: 'components_home_cms_listings';
  info: {
    displayName: 'CMS Listing';
  };
  attributes: {
    isCarousel: Schema.Attribute.Boolean;
    serviceList: Schema.Attribute.Relation<
      'oneToMany',
      'api::cms-detail.cms-detail'
    >;
    serviceTitle: Schema.Attribute.String;
    serviceVariant: Schema.Attribute.Component<'home.card-variant', false>;
  };
}

export interface HomeDesignTabs extends Struct.ComponentSchema {
  collectionName: 'components_home_design_tabs';
  info: {
    displayName: 'design Tabs';
  };
  attributes: {
    flow: Schema.Attribute.Component<'home.ux-flow', true>;
    tabTitle: Schema.Attribute.String;
  };
}

export interface HomeDevelopmentAndDesignListing
  extends Struct.ComponentSchema {
  collectionName: 'components_home_development_and_design_listings';
  info: {
    displayName: 'development and Design Listing';
  };
  attributes: {
    isCarousel: Schema.Attribute.Boolean;
    serviceList: Schema.Attribute.Relation<
      'oneToMany',
      'api::development-and-design-detail.development-and-design-detail'
    >;
    serviceTitle: Schema.Attribute.String;
    serviceVariant: Schema.Attribute.Component<'home.card-variant', false>;
  };
}

export interface HomeDigitalMarketingListing extends Struct.ComponentSchema {
  collectionName: 'components_home_digital_marketing_listings';
  info: {
    displayName: 'Digital Marketing Listing';
  };
  attributes: {
    isCarousel: Schema.Attribute.Boolean;
    serviceList: Schema.Attribute.Relation<
      'oneToMany',
      'api::digital-marketing-detail.digital-marketing-detail'
    >;
    serviceTitle: Schema.Attribute.String;
    serviceVariant: Schema.Attribute.Component<'home.card-variant', false>;
  };
}

export interface HomeHireServiceList extends Struct.ComponentSchema {
  collectionName: 'components_home_hire_service_lists';
  info: {
    displayName: 'hireServiceList';
  };
  attributes: {
    isCarousel: Schema.Attribute.Boolean;
    serviceList: Schema.Attribute.Relation<
      'oneToMany',
      'api::hire-expert-detail.hire-expert-detail'
    >;
    serviceTitle: Schema.Attribute.String;
    serviceVariant: Schema.Attribute.Component<'home.card-variant', false>;
  };
}

export interface HomeImpactUx extends Struct.ComponentSchema {
  collectionName: 'components_home_impact_uxes';
  info: {
    displayName: 'impactUx';
  };
  attributes: {
    afterImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    afterText: Schema.Attribute.String;
    beforeImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    beforeText: Schema.Attribute.String;
    desktopFrame: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    mobileFrame: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    title: Schema.Attribute.String;
  };
}

export interface HomeIndustryListing extends Struct.ComponentSchema {
  collectionName: 'components_home_industry_listings';
  info: {
    displayName: 'Industry Listing';
  };
  attributes: {
    industry_list: Schema.Attribute.Relation<
      'oneToMany',
      'api::industry-detail-page.industry-detail-page'
    >;
    industryListTitle: Schema.Attribute.String;
  };
}

export interface HomeLogo extends Struct.ComponentSchema {
  collectionName: 'components_home_logos';
  info: {
    displayName: 'logo';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface HomeQaTestingListing extends Struct.ComponentSchema {
  collectionName: 'components_home_qa_testing_listings';
  info: {
    displayName: 'QA Testing Listing';
  };
  attributes: {
    isCarousel: Schema.Attribute.Boolean;
    serviceList: Schema.Attribute.Relation<
      'oneToMany',
      'api::qa-testing-detail.qa-testing-detail'
    >;
    serviceTitle: Schema.Attribute.String;
    serviceVariant: Schema.Attribute.Component<'home.card-variant', false>;
  };
}

export interface HomeServiceList extends Struct.ComponentSchema {
  collectionName: 'components_home_service_lists';
  info: {
    displayName: 'serviceList';
  };
  attributes: {
    isCarousel: Schema.Attribute.Boolean;
    serviceList: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-card.service-card'
    >;
    serviceTitle: Schema.Attribute.String;
    serviceVariant: Schema.Attribute.Component<'home.card-variant', false>;
  };
}

export interface HomeSitecoreListing extends Struct.ComponentSchema {
  collectionName: 'components_home_sitecore_listings';
  info: {
    displayName: 'Sitecore Listing';
  };
  attributes: {
    isCarousel: Schema.Attribute.Boolean;
    serviceList: Schema.Attribute.Relation<
      'oneToMany',
      'api::sitecore-detail.sitecore-detail'
    >;
    serviceTitle: Schema.Attribute.String;
    serviceVariant: Schema.Attribute.Component<'home.card-variant', false>;
  };
}

export interface HomeTechStackComponent extends Struct.ComponentSchema {
  collectionName: 'components_home_tech_stack_components';
  info: {
    displayName: 'Tech Stack Component';
  };
  attributes: {
    category: Schema.Attribute.Relation<
      'oneToOne',
      'api::tech-stack-category.tech-stack-category'
    >;
    tabContent: Schema.Attribute.Component<'home.logo', true>;
  };
}

export interface HomeUiUxLisitng extends Struct.ComponentSchema {
  collectionName: 'components_home_ui_ux_lisitngs';
  info: {
    displayName: 'UI UX Lisitng';
  };
  attributes: {
    isCarousel: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.Component<'shared.link', false>;
    serviceList: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-card.service-card'
    >;
    serviceTitle: Schema.Attribute.String;
    serviceVariant: Schema.Attribute.Component<'home.card-variant', false>;
  };
}

export interface HomeUxFlow extends Struct.ComponentSchema {
  collectionName: 'components_home_ux_flows';
  info: {
    displayName: 'Ux Flow';
  };
  attributes: {
    gif: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    information: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ReuseCard extends Struct.ComponentSchema {
  collectionName: 'components_reuse_cards';
  info: {
    description: '';
    displayName: 'Card';
  };
  attributes: {
    AerrowIcon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    HoverIcon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    LogoLink: Schema.Attribute.Component<'shared.link', false>;
    LogoTitle: Schema.Attribute.String;
    TitleIcon: Schema.Attribute.Component<'title-icon.title-icon', true>;
  };
}

export interface ReuseNumberTitleContent extends Struct.ComponentSchema {
  collectionName: 'components_reuse_number_title_contents';
  info: {
    displayName: 'Number Title Content';
  };
  attributes: {
    Content: Schema.Attribute.RichText;
    Number: Schema.Attribute.String;
    Title: Schema.Attribute.Text;
  };
}

export interface ReuseProjectsSlider extends Struct.ComponentSchema {
  collectionName: 'components_reuse_projects_sliders';
  info: {
    displayName: 'Projects Slider';
  };
  attributes: {
    addact_case_studies: Schema.Attribute.Relation<
      'oneToMany',
      'api::addact-case-study.addact-case-study'
    >;
    Title: Schema.Attribute.Text;
  };
}

export interface ReuseTitleWithCard extends Struct.ComponentSchema {
  collectionName: 'components_reuse_title_with_cards';
  info: {
    displayName: 'TitleWithCard';
  };
  attributes: {
    SolutionsCards: Schema.Attribute.Component<
      'base-template.title-with-description',
      true
    >;
    Title: Schema.Attribute.Text;
  };
}

export interface SharedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    description: '';
    displayName: 'Card';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface SharedContactDetails extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_details';
  info: {
    description: '';
    displayName: 'Contact Details';
    icon: 'phone';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    text: Schema.Attribute.String;
  };
}

export interface SharedCta extends Struct.ComponentSchema {
  collectionName: 'components_shared_ctas';
  info: {
    displayName: 'CTA Card';
  };
  attributes: {
    CtaDescription: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
    CtaImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    CtaLink: Schema.Attribute.Component<'shared.link', false>;
    CtaTitle: Schema.Attribute.String;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedHeroLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_hero_link_items';
  info: {
    displayName: 'HeroLinkItem';
  };
  attributes: {
    label: Schema.Attribute.String;
    scrollId: Schema.Attribute.String;
  };
}

export interface SharedImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_images';
  info: {
    displayName: 'Image';
    icon: 'gift';
  };
  attributes: {
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    tooltip: Schema.Attribute.String;
  };
}

export interface SharedLayer1 extends Struct.ComponentSchema {
  collectionName: 'components_shared_layer_1s';
  info: {
    description: '';
    displayName: 'Layer 1';
    icon: 'layer-group';
  };
  attributes: {
    card: Schema.Attribute.Component<'shared.card', false>;
    isCardShow: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    isNavHide: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.Component<'shared.link', false>;
    subLayers: Schema.Attribute.Component<'shared.layer-2', true>;
  };
}

export interface SharedLayer2 extends Struct.ComponentSchema {
  collectionName: 'components_shared_layer_2s';
  info: {
    description: '';
    displayName: 'Layer 2';
    icon: 'layer-group';
  };
  attributes: {
    card: Schema.Attribute.Component<'shared.card', false>;
    isCardShow: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    isNavHide: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.Component<'shared.link', false>;
    subLayers: Schema.Attribute.Component<'shared.layer-3', true>;
  };
}

export interface SharedLayer3 extends Struct.ComponentSchema {
  collectionName: 'components_shared_layer_3s';
  info: {
    description: '';
    displayName: 'Layer 3';
    icon: 'layer-group';
  };
  attributes: {
    card: Schema.Attribute.Component<'shared.card', false>;
    isCardShow: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    isNavHide: Schema.Attribute.Boolean &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.Component<'shared.link', false>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 500000;
      }> &
      Schema.Attribute.DefaultTo<'/'>;
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Read Now'>;
    SubDisc: Schema.Attribute.Text;
    target: Schema.Attribute.Enumeration<
      ['_self', '_blank', '_parent', '_top']
    > &
      Schema.Attribute.DefaultTo<'_self'>;
  };
}

export interface SharedLinkIcons extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_icons';
  info: {
    description: '';
    displayName: 'LinkIcons';
  };
  attributes: {
    HoverIcon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Icons: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    LinkIcons: Schema.Attribute.Component<'shared.link', true>;
    Title: Schema.Attribute.String;
  };
}

export interface SharedNumberValueCounter extends Struct.ComponentSchema {
  collectionName: 'components_shared_number_value_counters';
  info: {
    displayName: 'Number Value Counter';
  };
  attributes: {
    Content: Schema.Attribute.String;
    Number: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
  };
  attributes: {
    canonicalURL: Schema.Attribute.Text;
    languageTag: Schema.Attribute.Enumeration<['en']>;
    metaDescription: Schema.Attribute.Text;
    metaRobots: Schema.Attribute.Enumeration<
      ['index', 'follow', 'noindex', 'nofollow']
    >;
    metaTitle: Schema.Attribute.Text;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    ogTitle: Schema.Attribute.Text;
    structuredData: Schema.Attribute.JSON;
    twitterCardTitle: Schema.Attribute.Text;
  };
}

export interface TitleIconTitleIcon extends Struct.ComponentSchema {
  collectionName: 'components_title_icon_title_icons';
  info: {
    displayName: 'TitleIcon';
  };
  attributes: {
    Icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'addact-component.aboutus-content': AddactComponentAboutusContent;
      'addact-component.client-testimonial-items': AddactComponentClientTestimonialItems;
      'addact-component.contact-form-block': AddactComponentContactFormBlock;
      'addact-component.contact-us-address': AddactComponentContactUsAddress;
      'addact-component.contact-us-days-online-offline': AddactComponentContactUsDaysOnlineOffline;
      'addact-component.contact-us-email-phone-links': AddactComponentContactUsEmailPhoneLinks;
      'addact-component.content-with-number': AddactComponentContentWithNumber;
      'addact-component.gallery': AddactComponentGallery;
      'addact-component.gallery-titles': AddactComponentGalleryTitles;
      'addact-component.images': AddactComponentImages;
      'addact-component.our-partners': AddactComponentOurPartners;
      'addact-component.quote': AddactComponentQuote;
      'addact-component.video-block': AddactComponentVideoBlock;
      'addact-component.vision-mission': AddactComponentVisionMission;
      'addact-component.we-are-addact': AddactComponentWeAreAddact;
      'author.author': AuthorAuthor;
      'banner.banner': BannerBanner;
      'banner.event-banner': BannerEventBanner;
      'base-template.base-heading': BaseTemplateBaseHeading;
      'base-template.common-section': BaseTemplateCommonSection;
      'base-template.globe-animation': BaseTemplateGlobeAnimation;
      'base-template.link-image': BaseTemplateLinkImage;
      'base-template.promo': BaseTemplatePromo;
      'base-template.richtext': BaseTemplateRichtext;
      'base-template.title': BaseTemplateTitle;
      'base-template.title-tag': BaseTemplateTitleTag;
      'base-template.title-with-description': BaseTemplateTitleWithDescription;
      'blog-hero-banner.blog-hero-banner': BlogHeroBannerBlogHeroBanner;
      'card.card': CardCard;
      'cardsdata.card': CardsdataCard;
      'contact-us-component.day-status': ContactUsComponentDayStatus;
      'contact-us-component.office-location': ContactUsComponentOfficeLocation;
      'contact-us-component.title-sub-titel-and-image': ContactUsComponentTitleSubTitelAndImage;
      'counter.counter': CounterCounter;
      'headings.h1': HeadingsH1;
      'headings.h2': HeadingsH2;
      'headings.h3': HeadingsH3;
      'headings.h4': HeadingsH4;
      'headings.h5': HeadingsH5;
      'headings.h6': HeadingsH6;
      'home.ai-card': HomeAiCard;
      'home.ai-eco-system': HomeAiEcoSystem;
      'home.ai-our-services': HomeAiOurServices;
      'home.ai-solve-problem': HomeAiSolveProblem;
      'home.ai-solve-problem-card': HomeAiSolveProblemCard;
      'home.animation-banner': HomeAnimationBanner;
      'home.base-component': HomeBaseComponent;
      'home.capabilities': HomeCapabilities;
      'home.card-variant': HomeCardVariant;
      'home.cms-listing': HomeCmsListing;
      'home.design-tabs': HomeDesignTabs;
      'home.development-and-design-listing': HomeDevelopmentAndDesignListing;
      'home.digital-marketing-listing': HomeDigitalMarketingListing;
      'home.hire-service-list': HomeHireServiceList;
      'home.impact-ux': HomeImpactUx;
      'home.industry-listing': HomeIndustryListing;
      'home.logo': HomeLogo;
      'home.qa-testing-listing': HomeQaTestingListing;
      'home.service-list': HomeServiceList;
      'home.sitecore-listing': HomeSitecoreListing;
      'home.tech-stack-component': HomeTechStackComponent;
      'home.ui-ux-lisitng': HomeUiUxLisitng;
      'home.ux-flow': HomeUxFlow;
      'reuse.card': ReuseCard;
      'reuse.number-title-content': ReuseNumberTitleContent;
      'reuse.projects-slider': ReuseProjectsSlider;
      'reuse.title-with-card': ReuseTitleWithCard;
      'shared.card': SharedCard;
      'shared.contact-details': SharedContactDetails;
      'shared.cta': SharedCta;
      'shared.hero-link-item': SharedHeroLinkItem;
      'shared.image': SharedImage;
      'shared.layer-1': SharedLayer1;
      'shared.layer-2': SharedLayer2;
      'shared.layer-3': SharedLayer3;
      'shared.link': SharedLink;
      'shared.link-icons': SharedLinkIcons;
      'shared.number-value-counter': SharedNumberValueCounter;
      'shared.seo': SharedSeo;
      'title-icon.title-icon': TitleIconTitleIcon;
    }
  }
}
