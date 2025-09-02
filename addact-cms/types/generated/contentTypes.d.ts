import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAboutUsAboutUs extends Struct.SingleTypeSchema {
  collectionName: 'about_uses';
  info: {
    displayName: 'about-us';
    pluralName: 'about-uses';
    singularName: 'about-us';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AboutUsContent: Schema.Attribute.Component<
      'addact-component.aboutus-content',
      false
    >;
    aboutUsCTA: Schema.Attribute.Relation<'oneToOne', 'api::cta.cta'>;
    BrandValue: Schema.Attribute.Component<
      'addact-component.aboutus-content',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    HeroBanner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::about-us.about-us'
    > &
      Schema.Attribute.Private;
    OurVisionMission: Schema.Attribute.Component<
      'addact-component.vision-mission',
      true
    >;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    Quote: Schema.Attribute.Component<'addact-component.quote', false>;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    WeAreAddact: Schema.Attribute.Component<
      'addact-component.we-are-addact',
      false
    >;
  };
}

export interface ApiAddactBlogAddactBlog extends Struct.CollectionTypeSchema {
  collectionName: 'addact_blogs';
  info: {
    displayName: 'AddactBlog';
    pluralName: 'addact-blogs';
    singularName: 'addact-blog';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    author: Schema.Attribute.Relation<'oneToOne', 'api::author.author'>;
    blog_category: Schema.Attribute.Relation<
      'oneToOne',
      'api::blog-category.blog-category'
    >;
    BlogBanner: Schema.Attribute.DynamicZone<
      ['blog-hero-banner.blog-hero-banner']
    >;
    BlogContent: Schema.Attribute.DynamicZone<
      [
        'headings.h6',
        'headings.h5',
        'headings.h4',
        'headings.h3',
        'headings.h2',
        'headings.h1',
        'shared.image',
        'shared.link',
        'base-template.richtext',
      ]
    >;
    contactCard: Schema.Attribute.Relation<
      'oneToOne',
      'api::contact-card.contact-card'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Description: Schema.Attribute.Text;
    HeadingSection: Schema.Attribute.DynamicZone<
      ['base-template.common-section']
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::addact-blog.addact-blog'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    similarBlogs: Schema.Attribute.Relation<
      'oneToMany',
      'api::addact-blog.addact-blog'
    >;
    similarstorytitle: Schema.Attribute.Relation<
      'oneToOne',
      'api::common-title.common-title'
    >;
    Slug: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    socialicons: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-icon.social-icon'
    >;
    Title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAddactCaseStudyAddactCaseStudy
  extends Struct.CollectionTypeSchema {
  collectionName: 'addact_case_studies';
  info: {
    displayName: 'AddactCaseStudy';
    pluralName: 'addact-case-studies';
    singularName: 'addact-case-study';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CaseStudyContent: Schema.Attribute.DynamicZone<
      [
        'headings.h6',
        'headings.h5',
        'headings.h4',
        'headings.h3',
        'headings.h2',
        'headings.h1',
        'shared.link',
        'shared.image',
        'base-template.richtext',
      ]
    >;
    CaseStudyPDF: Schema.Attribute.Media<'files'>;
    caseStudySummary: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    FormFields: Schema.Attribute.Relation<
      'oneToOne',
      'api::form-field.form-field'
    >;
    FormTitle: Schema.Attribute.Relation<
      'oneToOne',
      'api::common-title.common-title'
    >;
    HeadingSection: Schema.Attribute.DynamicZone<
      ['base-template.common-section']
    >;
    HeroBanner: Schema.Attribute.DynamicZone<
      ['blog-hero-banner.blog-hero-banner']
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::addact-case-study.addact-case-study'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    Slug: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAddactEventsAddactEvents
  extends Struct.CollectionTypeSchema {
  collectionName: 'addacts_events';
  info: {
    displayName: 'AddactEvents';
    pluralName: 'addacts-events';
    singularName: 'addact-events';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contact_us_card: Schema.Attribute.Relation<
      'oneToOne',
      'api::form-field.form-field'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    EventBanner: Schema.Attribute.DynamicZone<
      ['blog-hero-banner.blog-hero-banner']
    >;
    EventContent: Schema.Attribute.DynamicZone<
      [
        'headings.h1',
        'headings.h2',
        'headings.h3',
        'headings.h4',
        'headings.h5',
        'headings.h6',
        'base-template.richtext',
        'shared.image',
        'shared.link',
      ]
    >;
    EventSummary: Schema.Attribute.Text;
    HeadingSection: Schema.Attribute.DynamicZone<
      ['base-template.common-section']
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::addact-events.addact-events'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    Slug: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAddactPressReleaseAddactPressRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'addact_press_releases';
  info: {
    displayName: 'AddactPressRelease';
    pluralName: 'addact-press-releases';
    singularName: 'addact-press-release';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    HeroBanner: Schema.Attribute.DynamicZone<
      ['blog-hero-banner.blog-hero-banner']
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::addact-press-release.addact-press-release'
    > &
      Schema.Attribute.Private;
    PressContent: Schema.Attribute.DynamicZone<
      [
        'shared.link',
        'shared.image',
        'headings.h1',
        'headings.h2',
        'headings.h3',
        'headings.h4',
        'headings.h5',
        'headings.h6',
        'base-template.richtext',
      ]
    >;
    PressReleaseSummary: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    Slug: Schema.Attribute.String & Schema.Attribute.Required;
    social_icons: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-icon.social-icon'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAddactWebinarAddactWebinar
  extends Struct.CollectionTypeSchema {
  collectionName: 'addact_webinars';
  info: {
    displayName: 'AddactWebinar';
    pluralName: 'addact-webinars';
    singularName: 'addact-webinar';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    HeroBanner: Schema.Attribute.DynamicZone<
      ['blog-hero-banner.blog-hero-banner']
    >;
    Host: Schema.Attribute.Relation<'oneToMany', 'api::author.author'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::addact-webinar.addact-webinar'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    Slug: Schema.Attribute.String & Schema.Attribute.Required;
    Speakers: Schema.Attribute.Relation<'oneToMany', 'api::author.author'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    WebinarContent: Schema.Attribute.DynamicZone<
      [
        'headings.h1',
        'headings.h2',
        'headings.h3',
        'headings.h4',
        'headings.h5',
        'headings.h6',
        'base-template.richtext',
        'shared.image',
        'shared.link',
      ]
    >;
    WebinarSummary: Schema.Attribute.Text;
  };
}

export interface ApiAuthorDesignationAuthorDesignation
  extends Struct.CollectionTypeSchema {
  collectionName: 'author_designations';
  info: {
    displayName: 'AuthorDesignation';
    pluralName: 'author-designations';
    singularName: 'author-designation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    DesignationTitle: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::author-designation.author-designation'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAuthorAuthor extends Struct.CollectionTypeSchema {
  collectionName: 'authors';
  info: {
    displayName: 'Author';
    pluralName: 'authors';
    singularName: 'author';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Author: Schema.Attribute.Component<'author.author', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::author.author'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBannerBanner extends Struct.CollectionTypeSchema {
  collectionName: 'banners';
  info: {
    displayName: 'Banner';
    pluralName: 'banners';
    singularName: 'banner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Banner: Schema.Attribute.DynamicZone<['banner.banner']>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::banner.banner'
    > &
      Schema.Attribute.Private;
    pageReference: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBlogCategoryBlogCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'blog_categories';
  info: {
    displayName: 'BlogCategory';
    pluralName: 'blog-categories';
    singularName: 'blog-category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Category: Schema.Attribute.Component<'base-template.title-tag', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::blog-category.blog-category'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBlogsBlogs extends Struct.SingleTypeSchema {
  collectionName: 'blogs_list';
  info: {
    displayName: 'blogs';
    pluralName: 'blogs-list';
    singularName: 'blogs';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blogBanner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::blogs.blogs'> &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiBrandGuidelineBrandGuideline
  extends Struct.SingleTypeSchema {
  collectionName: 'brand_guidelines';
  info: {
    displayName: 'brand-guideline';
    pluralName: 'brand-guidelines';
    singularName: 'brand-guideline';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Schema.Attribute.DynamicZone<
      [
        'headings.h1',
        'headings.h2',
        'headings.h3',
        'headings.h4',
        'headings.h5',
        'headings.h6',
        'base-template.richtext',
        'shared.image',
        'shared.link',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    FormFileds: Schema.Attribute.Relation<
      'oneToOne',
      'api::form-field.form-field'
    >;
    FromTitle: Schema.Attribute.String;
    GuidelinePDF: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    HeroBanner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::brand-guideline.brand-guideline'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    Slug: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCareerDetailCareerDetail
  extends Struct.CollectionTypeSchema {
  collectionName: 'career_details';
  info: {
    displayName: 'Career-Detail';
    pluralName: 'career-details';
    singularName: 'career-detail';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Banner: Schema.Attribute.DynamicZone<['banner.banner']>;
    careers_form: Schema.Attribute.Relation<
      'oneToOne',
      'api::careers-form.careers-form'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    JobDescription: Schema.Attribute.DynamicZone<
      [
        'headings.h6',
        'headings.h5',
        'headings.h4',
        'headings.h3',
        'headings.h2',
        'headings.h1',
        'base-template.richtext',
        'shared.link',
        'shared.image',
      ]
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::career-detail.career-detail'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<'base-template.base-heading', true>;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    Slug: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCareersFormCareersForm extends Struct.CollectionTypeSchema {
  collectionName: 'careers_forms';
  info: {
    displayName: 'CareersForm';
    pluralName: 'careers-forms';
    singularName: 'careers-form';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    FormFields: Schema.Attribute.Relation<
      'oneToOne',
      'api::form-field.form-field'
    >;
    LeftInsights: Schema.Attribute.Component<'base-template.promo', false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::careers-form.careers-form'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCareersCareers extends Struct.SingleTypeSchema {
  collectionName: 'careers_page';
  info: {
    displayName: 'careers';
    pluralName: 'careers-page';
    singularName: 'careers';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Banner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    Careercard: Schema.Attribute.Relation<
      'oneToOne',
      'api::global-card.global-card'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Gallery: Schema.Attribute.DynamicZone<['addact-component.gallery-titles']>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::careers.careers'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    positions: Schema.Attribute.Relation<'oneToMany', 'api::position.position'>;
    PositionsTitle: Schema.Attribute.Component<
      'base-template.title-with-description',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCaseStudyCaseStudy extends Struct.SingleTypeSchema {
  collectionName: 'case_studies';
  info: {
    displayName: 'case-study';
    pluralName: 'case-studies';
    singularName: 'case-study';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CaseStudyBanner: Schema.Attribute.Relation<
      'oneToOne',
      'api::banner.banner'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::case-study.case-study'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiClientTestimonialClientTestimonial
  extends Struct.CollectionTypeSchema {
  collectionName: 'client_testimonials';
  info: {
    displayName: 'ClientTestimonial';
    pluralName: 'client-testimonials';
    singularName: 'client-testimonial';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Item: Schema.Attribute.Component<
      'addact-component.client-testimonial-items',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::client-testimonial.client-testimonial'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    Title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCommonTitleCommonTitle extends Struct.CollectionTypeSchema {
  collectionName: 'common_titles';
  info: {
    displayName: 'CommonTitle';
    pluralName: 'common-titles';
    singularName: 'common-title';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CommonTitle: Schema.Attribute.DynamicZone<
      ['base-template.title-with-description']
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::common-title.common-title'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String;
    Slug: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactCardContactCard extends Struct.CollectionTypeSchema {
  collectionName: 'contact_cards';
  info: {
    displayName: 'ContactCard';
    pluralName: 'contact-cards';
    singularName: 'contact-card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ContactCard: Schema.Attribute.DynamicZone<['card.card']>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact-card.contact-card'
    > &
      Schema.Attribute.Private;
    pageReference: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactFormFieldContactFormField
  extends Struct.CollectionTypeSchema {
  collectionName: 'contact_form_fields';
  info: {
    displayName: 'ContactUsFormField';
    pluralName: 'contact-form-fields';
    singularName: 'contact-form-field';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    companyName: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    fullName: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact-form-field.contact-form-field'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    requirements: Schema.Attribute.Blocks;
    submittedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactUsFormContactUsForm
  extends Struct.CollectionTypeSchema {
  collectionName: 'contact_us_forms';
  info: {
    displayName: 'ContactUsForm';
    pluralName: 'contact-us-forms';
    singularName: 'contact-us-form';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BusinessEmail: Schema.Attribute.Email;
    CompanyName: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    DescribeYourRequirements: Schema.Attribute.Blocks;
    FullName: Schema.Attribute.String;
    HyperLink: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact-us-form.contact-us-form'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactContact extends Struct.SingleTypeSchema {
  collectionName: 'contacts';
  info: {
    displayName: 'contact';
    pluralName: 'contacts';
    singularName: 'contact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact.contact'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactusContactus extends Struct.SingleTypeSchema {
  collectionName: 'contactuses';
  info: {
    displayName: 'contactus';
    pluralName: 'contactuses';
    singularName: 'contactus';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AddactTeamImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    AddressContent: Schema.Attribute.Component<
      'addact-component.contact-us-address',
      false
    >;
    banner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    contactus: Schema.Attribute.Relation<
      'oneToOne',
      'api::form-field.form-field'
    >;
    ContactUsAvailability: Schema.Attribute.Component<
      'addact-component.contact-us-days-online-offline',
      true
    >;
    ContactUsFormBlock: Schema.Attribute.Component<
      'addact-component.contact-form-block',
      false
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Descriptions: Schema.Attribute.Blocks;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contactus.contactus'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    TitleLine1: Schema.Attribute.Text;
    TitleLine2: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCtaCta extends Struct.CollectionTypeSchema {
  collectionName: 'ctas';
  info: {
    displayName: 'CTA';
    pluralName: 'ctas';
    singularName: 'cta';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    CTADescription: Schema.Attribute.Blocks;
    CTAImage: Schema.Attribute.DynamicZone<['shared.image']>;
    CTALink: Schema.Attribute.DynamicZone<['shared.link']>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::cta.cta'> &
      Schema.Attribute.Private;
    pageReference: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.Text;
    Title: Schema.Attribute.DynamicZone<
      [
        'headings.h6',
        'headings.h5',
        'headings.h4',
        'headings.h3',
        'headings.h2',
        'headings.h1',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEventCategoryEventCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'event_categories';
  info: {
    displayName: 'Event Category';
    pluralName: 'event-categories';
    singularName: 'event-category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::event-category.event-category'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEventYearEventYear extends Struct.CollectionTypeSchema {
  collectionName: 'event_years';
  info: {
    displayName: 'Event Year';
    pluralName: 'event-years';
    singularName: 'event-year';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::event-year.event-year'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    year: Schema.Attribute.BigInteger;
  };
}

export interface ApiEventEvent extends Struct.SingleTypeSchema {
  collectionName: 'events';
  info: {
    displayName: 'Events';
    pluralName: 'events';
    singularName: 'event';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    EventBanner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::event.event'> &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<'base-template.base-heading', true>;
    publishedAt: Schema.Attribute.DateTime;
    RefranceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFaqFaq extends Struct.CollectionTypeSchema {
  collectionName: 'faqs';
  info: {
    displayName: 'FAQ';
    pluralName: 'faqs';
    singularName: 'faq';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    FAQ: Schema.Attribute.Component<
      'base-template.title-with-description',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String;
    Title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFooterLinkFooterLink extends Struct.CollectionTypeSchema {
  collectionName: 'footer_links';
  info: {
    displayName: 'FooterLink';
    pluralName: 'footer-links';
    singularName: 'footer-link';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::footer-link.footer-link'
    > &
      Schema.Attribute.Private;
    NavLink: Schema.Attribute.DynamicZone<
      ['base-template.title', 'shared.link']
    >;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFooterFooter extends Struct.CollectionTypeSchema {
  collectionName: 'footers';
  info: {
    displayName: 'Footer';
    pluralName: 'footers';
    singularName: 'footer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AddressInformation: Schema.Attribute.DynamicZone<
      ['base-template.title-with-description']
    >;
    AddressInformationMobileBgImg: Schema.Attribute.Component<
      'shared.image',
      true
    >;
    BackGroundImage: Schema.Attribute.Component<'shared.image', false>;
    BackGroundImageMobile: Schema.Attribute.Component<'shared.image', false>;
    CopyrightText: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    footerlinks: Schema.Attribute.Relation<
      'oneToMany',
      'api::footer-link.footer-link'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::footer.footer'
    > &
      Schema.Attribute.Private;
    Logo: Schema.Attribute.Component<'shared.image', false>;
    milestonesimage: Schema.Attribute.DynamicZone<['shared.image']>;
    milestonestitle: Schema.Attribute.Relation<
      'oneToOne',
      'api::common-title.common-title'
    >;
    publishedAt: Schema.Attribute.DateTime;
    SiteSlog: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFormFieldFormField extends Struct.CollectionTypeSchema {
  collectionName: 'form_fields';
  info: {
    displayName: 'FormField';
    pluralName: 'form-fields';
    singularName: 'form-field';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ButtonLabel: Schema.Attribute.String;
    CompanyName: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    EmailLabel: Schema.Attribute.String;
    Form: Schema.Attribute.DynamicZone<['base-template.promo']>;
    GeneralText: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::form-field.form-field'
    > &
      Schema.Attribute.Private;
    NameLable: Schema.Attribute.String;
    pageReference: Schema.Attribute.String;
    PhoneLabel: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    RecipientEmails: Schema.Attribute.Text;
    RequirementsLabel: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGalleryCategoryGalleryCategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'gallery_categories';
  info: {
    displayName: 'GalleryCategory';
    pluralName: 'gallery-categories';
    singularName: 'gallery-category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Images: Schema.Attribute.Component<'addact-component.gallery', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::gallery-category.gallery-category'
    > &
      Schema.Attribute.Private;
    Name: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGlobalCardGlobalCard extends Struct.CollectionTypeSchema {
  collectionName: 'global_cards';
  info: {
    displayName: 'GlobalCard';
    pluralName: 'global-cards';
    singularName: 'global-card';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    GlobalCard: Schema.Attribute.DynamicZone<['base-template.promo']>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::global-card.global-card'
    > &
      Schema.Attribute.Private;
    pageReference: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    Title: Schema.Attribute.DynamicZone<
      [
        'headings.h1',
        'headings.h2',
        'headings.h3',
        'headings.h4',
        'headings.h5',
        'headings.h6',
        'base-template.richtext',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeaderNavigationHeaderNavigation
  extends Struct.CollectionTypeSchema {
  collectionName: 'header_navigations';
  info: {
    displayName: 'HeaderNavigation';
    pluralName: 'header-navigations';
    singularName: 'header-navigation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    HeaderNavLink: Schema.Attribute.DynamicZone<['base-template.title']>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::header-navigation.header-navigation'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeaderSubNavHeaderSubNav
  extends Struct.CollectionTypeSchema {
  collectionName: 'header_sub_navs';
  info: {
    displayName: 'HeaderSubNav';
    pluralName: 'header-sub-navs';
    singularName: 'header-sub-nav';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::header-sub-nav.header-sub-nav'
    > &
      Schema.Attribute.Private;
    Parent: Schema.Attribute.Relation<
      'oneToOne',
      'api::header-navigation.header-navigation'
    >;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String;
    SubNavImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    SubNavLink: Schema.Attribute.DynamicZone<['shared.link']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeaderHeader extends Struct.CollectionTypeSchema {
  collectionName: 'headers';
  info: {
    displayName: 'Header';
    pluralName: 'headers';
    singularName: 'header';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contact_us: Schema.Attribute.DynamicZone<['shared.link']>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    HeaderLogo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::header.header'
    > &
      Schema.Attribute.Private;
    main_navigations: Schema.Attribute.Relation<
      'oneToMany',
      'api::header-sub-nav.header-sub-nav'
    >;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHireDeveloperHireDeveloper
  extends Struct.CollectionTypeSchema {
  collectionName: 'hire_developer';
  info: {
    displayName: 'HireDevelopers';
    pluralName: 'hire-developers';
    singularName: 'hire-developer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    client_testimonial: Schema.Attribute.Relation<
      'oneToOne',
      'api::client-testimonial.client-testimonial'
    >;
    contact_us: Schema.Attribute.Relation<
      'oneToOne',
      'api::form-field.form-field'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    cta2: Schema.Attribute.Component<'shared.cta', false>;
    faq: Schema.Attribute.Relation<'oneToOne', 'api::faq.faq'>;
    HeroBanner: Schema.Attribute.Component<'banner.banner', false>;
    industries_we_serve: Schema.Attribute.Relation<
      'oneToOne',
      'api::industries-we-serve.industries-we-serve'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::hire-developer.hire-developer'
    > &
      Schema.Attribute.Private;
    our_partner: Schema.Attribute.Relation<
      'oneToOne',
      'api::our-partner.our-partner'
    >;
    our_process: Schema.Attribute.Relation<
      'oneToOne',
      'api::our-process.our-process'
    >;
    our_service: Schema.Attribute.Relation<'oneToOne', 'api::service.service'>;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    Slug: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    why_addact: Schema.Attribute.Relation<
      'oneToOne',
      'api::global-card.global-card'
    >;
  };
}

export interface ApiHomeHome extends Struct.SingleTypeSchema {
  collectionName: 'homes';
  info: {
    displayName: 'home';
    pluralName: 'homes';
    singularName: 'home';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    banner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    contactus: Schema.Attribute.Relation<
      'oneToOne',
      'api::form-field.form-field'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cta: Schema.Attribute.Relation<'oneToOne', 'api::cta.cta'>;
    GlobeAnimation: Schema.Attribute.Component<
      'base-template.globe-animation',
      false
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::home.home'> &
      Schema.Attribute.Private;
    ourexpertise: Schema.Attribute.Relation<
      'oneToOne',
      'api::our-expertise.our-expertise'
    >;
    ourpartner: Schema.Attribute.Relation<
      'oneToOne',
      'api::our-partner.our-partner'
    >;
    ourprocess: Schema.Attribute.Relation<
      'oneToOne',
      'api::our-process.our-process'
    >;
    ourservices: Schema.Attribute.Relation<
      'oneToOne',
      'api::global-card.global-card'
    >;
    PageHeading: Schema.Attribute.DynamicZone<['base-template.base-heading']>;
    publishedAt: Schema.Attribute.DateTime;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whoarewe: Schema.Attribute.Relation<
      'oneToOne',
      'api::who-are-we.who-are-we'
    >;
    whyaddact: Schema.Attribute.Relation<
      'oneToOne',
      'api::global-card.global-card'
    >;
  };
}

export interface ApiIndustriesWeServeIndustriesWeServe
  extends Struct.CollectionTypeSchema {
  collectionName: 'industries_we_serves';
  info: {
    displayName: 'IndustriesWeServe';
    pluralName: 'industries-we-serves';
    singularName: 'industries-we-serve';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Industries: Schema.Attribute.Component<'shared.link-icons', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::industries-we-serve.industries-we-serve'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String;
    TitleDescription: Schema.Attribute.Component<
      'base-template.title-with-description',
      false
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOurExpertiseOurExpertise
  extends Struct.CollectionTypeSchema {
  collectionName: 'our_expertises';
  info: {
    displayName: 'OurExpertise';
    pluralName: 'our-expertises';
    singularName: 'our-expertise';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CMS: Schema.Attribute.DynamicZone<
      ['shared.image', 'shared.link', 'base-template.link-image']
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ExpertiseTitle: Schema.Attribute.DynamicZone<
      ['base-template.title-with-description']
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::our-expertise.our-expertise'
    > &
      Schema.Attribute.Private;
    pageReference: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOurPartnerOurPartner extends Struct.CollectionTypeSchema {
  collectionName: 'our_partners';
  info: {
    displayName: 'OurPartner';
    pluralName: 'our-partners';
    singularName: 'our-partner';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ComponentName: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Image: Schema.Attribute.DynamicZone<['shared.image']>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::our-partner.our-partner'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    Title: Schema.Attribute.DynamicZone<
      [
        'headings.h6',
        'headings.h5',
        'headings.h4',
        'headings.h3',
        'headings.h2',
        'headings.h1',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOurProcessOurProcess extends Struct.CollectionTypeSchema {
  collectionName: 'our_processes';
  info: {
    displayName: 'OurProcess';
    pluralName: 'our-processes';
    singularName: 'our-process';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::our-process.our-process'
    > &
      Schema.Attribute.Private;
    pageReference: Schema.Attribute.String;
    ProcessData: Schema.Attribute.DynamicZone<
      ['base-template.title-with-description']
    >;
    publishedAt: Schema.Attribute.DateTime;
    Title: Schema.Attribute.DynamicZone<
      [
        'headings.h6',
        'headings.h5',
        'headings.h4',
        'headings.h3',
        'headings.h2',
        'headings.h1',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPositionPosition extends Struct.CollectionTypeSchema {
  collectionName: 'positions';
  info: {
    displayName: 'Position';
    pluralName: 'positions';
    singularName: 'position';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CardInfo: Schema.Attribute.DynamicZone<['reuse.card']>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    EventTitle: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::position.position'
    > &
      Schema.Attribute.Private;
    positions: Schema.Attribute.Relation<'oneToMany', 'api::position.position'>;
    publishedAt: Schema.Attribute.DateTime;
    RelationTitle: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPressReleasePressRelease extends Struct.SingleTypeSchema {
  collectionName: 'press_releases';
  info: {
    displayName: 'press-release';
    pluralName: 'press-releases';
    singularName: 'press-release';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    HeroBanner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::press-release.press-release'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPrivacyPolicyPrivacyPolicy extends Struct.SingleTypeSchema {
  collectionName: 'privacy_policies';
  info: {
    displayName: 'privacy-policy';
    pluralName: 'privacy-policies';
    singularName: 'privacy-policy';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BodyContent: Schema.Attribute.Relation<
      'oneToOne',
      'api::common-title.common-title'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::privacy-policy.privacy-policy'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiServiceListServiceList extends Struct.CollectionTypeSchema {
  collectionName: 'service_lists';
  info: {
    displayName: 'ServiceList';
    pluralName: 'service-lists';
    singularName: 'service-list';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Banner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    client_testimonial: Schema.Attribute.Relation<
      'oneToOne',
      'api::client-testimonial.client-testimonial'
    >;
    contact_us: Schema.Attribute.Relation<
      'oneToOne',
      'api::form-field.form-field'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cta: Schema.Attribute.Relation<'oneToOne', 'api::cta.cta'>;
    cta2: Schema.Attribute.Relation<'oneToOne', 'api::cta.cta'>;
    faq: Schema.Attribute.Relation<'oneToOne', 'api::faq.faq'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-list.service-list'
    > &
      Schema.Attribute.Private;
    our_partner: Schema.Attribute.Relation<
      'oneToOne',
      'api::our-partner.our-partner'
    >;
    our_process: Schema.Attribute.Relation<
      'oneToOne',
      'api::our-process.our-process'
    >;
    our_service: Schema.Attribute.Relation<'oneToOne', 'api::service.service'>;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    Slug: Schema.Attribute.String & Schema.Attribute.Required;
    sub_services: Schema.Attribute.Relation<
      'oneToMany',
      'api::sub-service-page.sub-service-page'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    why_addact: Schema.Attribute.Relation<
      'oneToOne',
      'api::global-card.global-card'
    >;
  };
}

export interface ApiServiceService extends Struct.CollectionTypeSchema {
  collectionName: 'services';
  info: {
    displayName: 'OurServices-ServiceList';
    pluralName: 'services';
    singularName: 'service';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    FirstTabDisplayName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'For Enterprises & Brands'>;
    ForEnterprisesBrands: Schema.Attribute.Relation<
      'oneToOne',
      'api::global-card.global-card'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::service.service'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SecondTabDisplayName: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'For Agencies & Tech Teams'>;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    team_feature: Schema.Attribute.Relation<
      'oneToOne',
      'api::team-feature.team-feature'
    >;
    Titeldescription: Schema.Attribute.Component<
      'base-template.title-with-description',
      true
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSitemapSitemap extends Struct.SingleTypeSchema {
  collectionName: 'sitemaps';
  info: {
    displayName: 'sitemap';
    pluralName: 'sitemaps';
    singularName: 'sitemap';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    banner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::sitemap.sitemap'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSocialIconSocialIcon extends Struct.CollectionTypeSchema {
  collectionName: 'social_icons';
  info: {
    displayName: 'SocialIcon';
    pluralName: 'social-icons';
    singularName: 'social-icon';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::social-icon.social-icon'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String;
    SocialIcon: Schema.Attribute.DynamicZone<['base-template.link-image']>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSubServicePageSubServicePage
  extends Struct.CollectionTypeSchema {
  collectionName: 'sub_service_pages';
  info: {
    displayName: 'SubServicePage';
    pluralName: 'sub-service-pages';
    singularName: 'sub-service-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    client_testimonial: Schema.Attribute.Relation<
      'oneToOne',
      'api::client-testimonial.client-testimonial'
    >;
    contact_us: Schema.Attribute.Relation<
      'oneToOne',
      'api::form-field.form-field'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    cta: Schema.Attribute.Component<'shared.cta', false>;
    cta2: Schema.Attribute.Component<'shared.cta', false>;
    faq: Schema.Attribute.Relation<'oneToOne', 'api::faq.faq'>;
    HeroBanner: Schema.Attribute.Component<'banner.banner', false>;
    industries_we_serve: Schema.Attribute.Relation<
      'oneToOne',
      'api::industries-we-serve.industries-we-serve'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::sub-service-page.sub-service-page'
    > &
      Schema.Attribute.Private;
    our_partner: Schema.Attribute.Relation<
      'oneToOne',
      'api::our-partner.our-partner'
    >;
    our_process: Schema.Attribute.Relation<
      'oneToOne',
      'api::our-process.our-process'
    >;
    our_service: Schema.Attribute.Relation<'oneToOne', 'api::service.service'>;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    service_list: Schema.Attribute.Relation<
      'manyToOne',
      'api::service-list.service-list'
    >;
    Slug: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    why_addact: Schema.Attribute.Relation<
      'oneToOne',
      'api::global-card.global-card'
    >;
  };
}

export interface ApiTeamFeatureTeamFeature extends Struct.CollectionTypeSchema {
  collectionName: 'team_features';
  info: {
    displayName: 'TeamFeature';
    pluralName: 'team-features';
    singularName: 'team-feature';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Cards: Schema.Attribute.Component<
      'base-template.title-with-description',
      true
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    Description: Schema.Attribute.Text;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::team-feature.team-feature'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTermsConditionsTermsConditions
  extends Struct.SingleTypeSchema {
  collectionName: 'terms_condition';
  info: {
    displayName: 'terms conditions';
    pluralName: 'terms-condition';
    singularName: 'terms-conditions';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    BodyContent: Schema.Attribute.Relation<
      'oneToOne',
      'api::common-title.common-title'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::terms-conditions.terms-conditions'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiThankYouThankYou extends Struct.SingleTypeSchema {
  collectionName: 'thank_yous';
  info: {
    displayName: 'thank-you ';
    pluralName: 'thank-yous';
    singularName: 'thank-you';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::thank-you.thank-you'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiThankyouPageThankyouPage
  extends Struct.CollectionTypeSchema {
  collectionName: 'thankyou_pages';
  info: {
    displayName: 'ThankyouPage';
    pluralName: 'thankyou-pages';
    singularName: 'thankyou-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AnimationVideo: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Content: Schema.Attribute.DynamicZone<
      [
        'base-template.richtext',
        'shared.link',
        'headings.h1',
        'headings.h2',
        'headings.h3',
        'headings.h4',
        'headings.h5',
        'headings.h6',
      ]
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::thankyou-page.thankyou-page'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    Slug: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiVideoListingVideoListing extends Struct.SingleTypeSchema {
  collectionName: 'video_listings';
  info: {
    displayName: 'VideoListing';
    pluralName: 'video-listings';
    singularName: 'video-listing';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    banner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::video-listing.video-listing'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    VideoList: Schema.Attribute.Component<'addact-component.video-block', true>;
  };
}

export interface ApiWebinarWebinar extends Struct.SingleTypeSchema {
  collectionName: 'webinars';
  info: {
    displayName: 'Webinar';
    pluralName: 'webinars';
    singularName: 'webinar';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    HeroBanner: Schema.Attribute.Relation<'oneToOne', 'api::banner.banner'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::webinar.webinar'
    > &
      Schema.Attribute.Private;
    PageHeading: Schema.Attribute.Component<
      'base-template.base-heading',
      false
    >;
    publishedAt: Schema.Attribute.DateTime;
    ReferenceTitle: Schema.Attribute.String & Schema.Attribute.Required;
    SEO: Schema.Attribute.Component<'shared.seo', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiWeekdayInfoWeekdayInfo extends Struct.CollectionTypeSchema {
  collectionName: 'weekday_infos';
  info: {
    displayName: 'weekday-info';
    pluralName: 'weekday-infos';
    singularName: 'weekday-info';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    image: Schema.Attribute.Component<'shared.image', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::weekday-info.weekday-info'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    TitelDescription: Schema.Attribute.Component<
      'base-template.title-with-description',
      true
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    weekdays: Schema.Attribute.Component<
      'contact-us-component.day-status',
      true
    >;
  };
}

export interface ApiWhoAreWeWhoAreWe extends Struct.CollectionTypeSchema {
  collectionName: 'who_are_wes';
  info: {
    displayName: 'WhoAreWe';
    pluralName: 'who-are-wes';
    singularName: 'who-are-we';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Counter: Schema.Attribute.DynamicZone<['counter.counter']>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::who-are-we.who-are-we'
    > &
      Schema.Attribute.Private;
    pageReference: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    Title: Schema.Attribute.DynamicZone<
      ['base-template.title-with-description']
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginStrapi5SitemapPluginStrapi5SitemapPluginContentType
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_5_sitemap_plugin_content_types';
  info: {
    displayName: 'strapi-5-sitemap-plugin-content-type';
    pluralName: 'strapi-5-sitemap-plugin-content-types';
    singularName: 'strapi-5-sitemap-plugin-content-type';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    frequency: Schema.Attribute.String;
    langcode: Schema.Attribute.String;
    lastModified: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type'
    > &
      Schema.Attribute.Private;
    pattern: Schema.Attribute.String;
    priority: Schema.Attribute.Float;
    publishedAt: Schema.Attribute.DateTime;
    thumbnail: Schema.Attribute.String;
    type: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginStrapi5SitemapPluginStrapi5SitemapPluginContentTypeSingleUrl
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_5_sitemap_plugin_content_type_single_urls';
  info: {
    displayName: 'strapi-5-sitemap-plugin-content-type-single-url';
    pluralName: 'strapi-5-sitemap-plugin-content-type-single-urls';
    singularName: 'strapi-5-sitemap-plugin-content-type-single-url';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    frequency: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url'
    > &
      Schema.Attribute.Private;
    priority: Schema.Attribute.Float;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginStrapi5SitemapPluginStrapi5SitemapPluginOption
  extends Struct.SingleTypeSchema {
  collectionName: 'strapi_5_sitemap_plugin_options';
  info: {
    displayName: 'strapi-5-sitemap-plugin-options';
    pluralName: 'strapi-5-sitemap-plugin-options';
    singularName: 'strapi-5-sitemap-plugin-option';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    baseUrl: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about-us.about-us': ApiAboutUsAboutUs;
      'api::addact-blog.addact-blog': ApiAddactBlogAddactBlog;
      'api::addact-case-study.addact-case-study': ApiAddactCaseStudyAddactCaseStudy;
      'api::addact-events.addact-events': ApiAddactEventsAddactEvents;
      'api::addact-press-release.addact-press-release': ApiAddactPressReleaseAddactPressRelease;
      'api::addact-webinar.addact-webinar': ApiAddactWebinarAddactWebinar;
      'api::author-designation.author-designation': ApiAuthorDesignationAuthorDesignation;
      'api::author.author': ApiAuthorAuthor;
      'api::banner.banner': ApiBannerBanner;
      'api::blog-category.blog-category': ApiBlogCategoryBlogCategory;
      'api::blogs.blogs': ApiBlogsBlogs;
      'api::brand-guideline.brand-guideline': ApiBrandGuidelineBrandGuideline;
      'api::career-detail.career-detail': ApiCareerDetailCareerDetail;
      'api::careers-form.careers-form': ApiCareersFormCareersForm;
      'api::careers.careers': ApiCareersCareers;
      'api::case-study.case-study': ApiCaseStudyCaseStudy;
      'api::client-testimonial.client-testimonial': ApiClientTestimonialClientTestimonial;
      'api::common-title.common-title': ApiCommonTitleCommonTitle;
      'api::contact-card.contact-card': ApiContactCardContactCard;
      'api::contact-form-field.contact-form-field': ApiContactFormFieldContactFormField;
      'api::contact-us-form.contact-us-form': ApiContactUsFormContactUsForm;
      'api::contact.contact': ApiContactContact;
      'api::contactus.contactus': ApiContactusContactus;
      'api::cta.cta': ApiCtaCta;
      'api::event-category.event-category': ApiEventCategoryEventCategory;
      'api::event-year.event-year': ApiEventYearEventYear;
      'api::event.event': ApiEventEvent;
      'api::faq.faq': ApiFaqFaq;
      'api::footer-link.footer-link': ApiFooterLinkFooterLink;
      'api::footer.footer': ApiFooterFooter;
      'api::form-field.form-field': ApiFormFieldFormField;
      'api::gallery-category.gallery-category': ApiGalleryCategoryGalleryCategory;
      'api::global-card.global-card': ApiGlobalCardGlobalCard;
      'api::header-navigation.header-navigation': ApiHeaderNavigationHeaderNavigation;
      'api::header-sub-nav.header-sub-nav': ApiHeaderSubNavHeaderSubNav;
      'api::header.header': ApiHeaderHeader;
      'api::hire-developer.hire-developer': ApiHireDeveloperHireDeveloper;
      'api::home.home': ApiHomeHome;
      'api::industries-we-serve.industries-we-serve': ApiIndustriesWeServeIndustriesWeServe;
      'api::our-expertise.our-expertise': ApiOurExpertiseOurExpertise;
      'api::our-partner.our-partner': ApiOurPartnerOurPartner;
      'api::our-process.our-process': ApiOurProcessOurProcess;
      'api::position.position': ApiPositionPosition;
      'api::press-release.press-release': ApiPressReleasePressRelease;
      'api::privacy-policy.privacy-policy': ApiPrivacyPolicyPrivacyPolicy;
      'api::service-list.service-list': ApiServiceListServiceList;
      'api::service.service': ApiServiceService;
      'api::sitemap.sitemap': ApiSitemapSitemap;
      'api::social-icon.social-icon': ApiSocialIconSocialIcon;
      'api::sub-service-page.sub-service-page': ApiSubServicePageSubServicePage;
      'api::team-feature.team-feature': ApiTeamFeatureTeamFeature;
      'api::terms-conditions.terms-conditions': ApiTermsConditionsTermsConditions;
      'api::thank-you.thank-you': ApiThankYouThankYou;
      'api::thankyou-page.thankyou-page': ApiThankyouPageThankyouPage;
      'api::video-listing.video-listing': ApiVideoListingVideoListing;
      'api::webinar.webinar': ApiWebinarWebinar;
      'api::weekday-info.weekday-info': ApiWeekdayInfoWeekdayInfo;
      'api::who-are-we.who-are-we': ApiWhoAreWeWhoAreWe;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type': PluginStrapi5SitemapPluginStrapi5SitemapPluginContentType;
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-content-type-single-url': PluginStrapi5SitemapPluginStrapi5SitemapPluginContentTypeSingleUrl;
      'plugin::strapi-5-sitemap-plugin.strapi-5-sitemap-plugin-option': PluginStrapi5SitemapPluginStrapi5SitemapPluginOption;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
