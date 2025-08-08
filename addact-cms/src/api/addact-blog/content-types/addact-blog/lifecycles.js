module.exports = {
    beforeCreate(event) {
      const { data } = event;
  
      if (!data.slug && data.HeadingSection?.[0]?.__component === 'base-template.common-section') {
        const title = data.HeadingSection[0].Title || 'blog';
        data.slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }
    },
  
    beforeUpdate(event) {
      const { data } = event;
  
      if (!data.slug && data.HeadingSection?.[0]?.__component === 'base-template.common-section') {
        const title = data.HeadingSection[0].Title || 'blog';
        data.slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '');
      }
    }
  };
  