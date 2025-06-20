import type { Schema, Struct } from '@strapi/strapi';

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
    Designation: Schema.Attribute.Enumeration<['CEO', 'CTO']>;
  };
}

export interface BaseTemplateCommonSection extends Struct.ComponentSchema {
  collectionName: 'components_base_template_common_sections';
  info: {
    displayName: 'CommonSection';
    icon: 'book';
  };
  attributes: {
    BlogTag: Schema.Attribute.Relation<
      'oneToOne',
      'api::blog-category.blog-category'
    >;
    PageTitle: Schema.Attribute.String;
    Slug: Schema.Attribute.String;
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
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Read Now'>;
    target: Schema.Attribute.Enumeration<['_blank']> &
      Schema.Attribute.DefaultTo<'_blank'>;
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
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    description: '';
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.String & Schema.Attribute.Required;
    Height: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    locate: Schema.Attribute.String;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.String;
    Width: Schema.Attribute.String;
  };
}

export interface SharedSEoCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_s_eo_cards';
  info: {
    description: '';
    displayName: 'SEoCard';
  };
  attributes: {
    Card: Schema.Attribute.String;
    Creator: Schema.Attribute.String;
    data1: Schema.Attribute.String;
    data2: Schema.Attribute.String;
    Description: Schema.Attribute.Text;
    Image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    label1: Schema.Attribute.String;
    label2: Schema.Attribute.String;
    Publisher: Schema.Attribute.String;
    Site: Schema.Attribute.String;
    Title: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    h1: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String & Schema.Attribute.Required;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', false>;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    metaViewport: Schema.Attribute.String;
    SEOCard: Schema.Attribute.Component<'shared.s-eo-card', false>;
    Sitename: Schema.Attribute.String;
    structuredData: Schema.Attribute.Component<'shared.structured-data', true>;
  };
}

export interface SharedStructuredData extends Struct.ComponentSchema {
  collectionName: 'components_shared_structured_data';
  info: {
    description: '';
    displayName: 'structuredData';
  };
  attributes: {
    structuredData: Schema.Attribute.RichText;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'author.author': AuthorAuthor;
      'base-template.common-section': BaseTemplateCommonSection;
      'base-template.title-tag': BaseTemplateTitleTag;
      'blog-hero-banner.blog-hero-banner': BlogHeroBannerBlogHeroBanner;
      'card.card': CardCard;
      'shared.link': SharedLink;
      'shared.link-icons': SharedLinkIcons;
      'shared.meta-social': SharedMetaSocial;
      'shared.s-eo-card': SharedSEoCard;
      'shared.seo': SharedSeo;
      'shared.structured-data': SharedStructuredData;
    }
  }
}
