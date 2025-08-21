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
    BannerTitle: Schema.Attribute.String;
    show_searchbox: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
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
      'reuse.card': ReuseCard;
      'shared.cta': SharedCta;
      'shared.hero-link-item': SharedHeroLinkItem;
      'shared.image': SharedImage;
      'shared.link': SharedLink;
      'shared.link-icons': SharedLinkIcons;
      'shared.number-value-counter': SharedNumberValueCounter;
      'shared.seo': SharedSeo;
      'title-icon.title-icon': TitleIconTitleIcon;
    }
  }
}
