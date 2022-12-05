/** Class representing the tag system view. */
class TagView {
  /**
   * Creates a Tag System View.
   * @param globalApplicationState The shared global application state
   */
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;

    // populate the arrays with data
    this.globalApplicationState.createdTags.forEach(tag => {
      const [partition, grouped] = this.getPartition(tag.conditions);
      tag.partition = partition;
      tag.grouped = grouped;
    });

    // render tag system views
    this.render();

    // run rerenders when state of tags change
    window.addEventListener('createdTagsChange', () => {
      this.render();
      console.log(this.globalApplicationState.createdTags);
    });

    // listen for event to add a new tag
    const colors = ['#4AE7CA', '#5B618A', '#A09ABC', '#F7EF81', '#BF3100', '#313715', '#443850', '#D81E5B', '#99C2A2'];
    const add = document.querySelector('.actions__add');
    add.addEventListener('click', () => {
      const conditions = ['Adobe Photoshop'];
      const [partition, grouped] = this.getPartition(conditions);

      this.globalApplicationState.createdTags.push({
        name: `Tag ${this.globalApplicationState.createdTags.length + 1}`,
        color: colors[Math.floor(Math.random() * colors.length)],
        conditions: conditions,
        partition,
        grouped
      });

      window.dispatchEvent(new Event('createdTagsChange'));
    });

    // listen for event to delete all tags
    const clear = document.querySelector('.actions__clear');
    clear.addEventListener('click', () => {
      this.globalApplicationState.createdTags = [];
      window.dispatchEvent(new Event('createdTagsChange'));
    });
  }

  // top-level/main method for initial renders and rerenders of tag system view
  render() {
    const presetList = document.querySelector('#preset-list');
    presetList.innerHTML = this._renderPresets();

    const presetsAll = document.querySelectorAll('.preset__item');
    presetsAll.forEach((presetElem, idx) => {
      presetElem.addEventListener('click', () => {
        this.globalApplicationState.createdTags = presets[idx].tags;
        this.globalApplicationState.createdTags.forEach(tag => {
          const [partition, grouped] = this.getPartition(tag.conditions);
          tag.partition = partition;
          tag.grouped = grouped;
        });
        window.dispatchEvent(new Event('createdTagsChange'));
      });
    });

    const tagList = document.querySelector('#tag-list');
    tagList.innerHTML = '';
    this.globalApplicationState.createdTags.forEach(tag => {
      const { name, color, conditions } = tag;
      // render tag details
      const tagElem = document.createElement('li');
      tagElem.classList.add('tag__item');
      tagElem.innerHTML = `
          <div class = "tag__label">
            <div class="tag__color">
              <input class="color__picker" type="color" id="favcolor" name="favcolor" value="${color}" />
            </div>
            <input class="tag__text" type="text" value="${name}" name="tag-1" />
            <span class="tag__divider">:</span>
            <ul class = "tags__chain">
              ${this._renderTagBubble(conditions)}
            </ul>
            <span class="material-symbols-outlined tag__add"> add_circle </span>
          </div>
          `;
      tagList.appendChild(tagElem);

      // listen for event to change tag color
      const picker = tagElem.querySelector('.color__picker');
      picker.addEventListener('input', e => {
        tag.color = picker.value;
        window.dispatchEvent(new Event('createdTagsChange'));
      });

      // listen for event to change tag name
      const textInput = tagElem.querySelector('.tag__text');
      textInput.addEventListener('input', e => {
        tag.name = textInput.value;
        window.dispatchEvent(new Event('createdTagsChange'));
      });

      // listen for event to add more conditional logic to tag
      const add = tagElem.querySelector('.tag__add');
      add.addEventListener('click', () => {
        tag.conditions.push('OR');
        tag.conditions.push('Adobe Photoshop');
        window.dispatchEvent(new Event('createdTagsChange'));
      });

      // The following listeners are hooked on elements in this.__renderTagBubble() method.
      // We wire them up here instead of inside that method because we need these to be in the
      // DOM (after tagList.appendChild(tagElem); method is called).
      const tagBubbles = tagElem.querySelectorAll('.tag__select'); // get all tag bubbles rendered
      tagBubbles.forEach((select, selectIdx) => {
        const dropdownInput = select.querySelector('div[data-dropdown]');
        const dropdownContent = select.querySelector('div[data-dropdown-content]');

        // handle toggling of dropdown button
        dropdownInput.addEventListener('click', () => {
          const arrow = dropdownInput.querySelector('.select__arrow');
          const previousIcon = arrow.innerHTML.trim();
          arrow.innerHTML = previousIcon === 'arrow_drop_down' ? 'arrow_drop_up' : 'arrow_drop_down';

          const previousDisplay = dropdownContent.style.display;
          dropdownContent.style.display = previousDisplay === 'none' ? '' : 'none';

          dropdownInput.classList.toggle('select__input--active');
        });

        dropdownContent.addEventListener('click', e => {
          if (e.target.classList.contains('select__option')) {
            // handle toggle style of options
            const options = dropdownContent.querySelectorAll('.select__option');
            options.forEach(option => option.classList.remove('select__option--selected'));
            e.target.classList.add('select__option--selected');

            // update dropdownInput value and tags value
            const value = e.target.getAttribute('data-value');
            dropdownInput.querySelector('.select__value').innerHTML = value;
            tag.conditions[selectIdx] = value;

            // close dropdown and update dropdownInput
            dropdownContent.style.display = 'none';
            dropdownInput.querySelector('.select__arrow').innerHTML = 'arrow_drop_down';
            dropdownInput.classList.toggle('select__input--active');
            const [partition, grouped] = this.getPartition(conditions);
            tag.partition = partition;
            tag.grouped = grouped;

            window.dispatchEvent(new Event('createdTagsChange'));
          }
        });
      });
    });
  }

  _renderPresets() {
    let html = '';
    presets.forEach(preset => {
      html += `
        <li class = "preset__item">
          ${preset.name}
        </li>
      `;
    });

    return html;
  }

  // helper method to render tag bubble
  _renderTagBubble(conditions) {
    let html = '';
    conditions.forEach(condition => {
      const isOperator = condition === 'AND' || condition === 'OR';
      html += `
        <div class="tag__select">
          <div class="select__input" data-dropdown>
            <span class="select__value">${condition}</span>
            <span class="material-symbols-outlined select__arrow"> arrow_drop_down </span>
          </div>
          <div class="select__dropdown" style = "display:none;" data-dropdown-content>
            ${isOperator ? this._renderOperatorDropdown(condition) : this._renderCategoryDropdown(condition)}
          </div>
        </div>`;
    });

    return html;
  }

  // helper method to render tag category dropdown
  _renderCategoryDropdown(condition) {
    const awards = [
      'honorable',
      'mobile excellence',
      'developer',
      'site of the day',
      'site of the month',
      'site of the year'
    ];
    const genre = [
      'Art & Illustration',
      'Technology',
      'Portfolio',
      'Architecture',
      'Film & TV',
      'Photography',
      'Business & Corporate',
      'Culture & Education',
      'E-Commerce',
      'Fashion',
      'Mobile & Apps',
      'Food & Drink',
      'Hotel / Restaurant',
      'Games & Entertainment',
      'Real Estate',
      'Sports',
      'Magazine / Newspaper / Blog'
    ];
    const design = [
      'Adobe Photoshop',
      'After Effects',
      'Adobe Illustrator',
      'Figma',
      'Blender',
      'Lottie',
      'Sketch',
      'Adobe XD',
      'Editor X',
      'Cinema 4D'
    ];
    const tech = [
      'React',
      'Framer Motion',
      'Unreal Engine',
      'WebGL',
      'Three.js',
      'GSAP Animation',
      'Webflow',
      'Contentful',
      'Wordpress',
      'Shopify',
      'Next.js',
      'Webpack',
      'Angular',
      'Anime.js',
      'Typescript',
      'AWS',
      'Vue.js',
      'Vercel',
      'jQuery',
      'PHP',
      'Bootstrap',
      'Node.js',
      'Tailwind CSS',
      'Unity',
      'GraphQL',
      'Google Font API',
      'Laravel',
      'Svelte',
      'VR',
      'Typekit',
      'Firebase',
      'Python',
      'Redux',
      'Gatsby',
      'Lo-dash',
      'Nginx',
      'Express',
      'Netlify',
      'PWA',
      'Go',
      'MongoDB',
      'Underscore.js',
      'Backbone.js',
      'D3',
      'Handlebars',
      'Socket.io',
      'Ruby',
      'Nuxt.js'
    ];
    const trends = [
      'Parallax',
      'Illustration',
      'Clean',
      'Microinteractions',
      'Flat Design',
      'Single page',
      'Minimal',
      'Colorful',
      'Storytelling',
      'Sass',
      'Data Visualization',
      'Big Background Images',
      'Infinite Scroll',
      'Gestures / Interaction'
    ];

    return `
      <ul class = "option-sections">
        ${this._renderCategoryDropdownList(awards, condition, 'Awards')}
        ${this._renderCategoryDropdownList(genre, condition, 'Genre')}
        ${this._renderCategoryDropdownList(design, condition, 'Design Software')}
        ${this._renderCategoryDropdownList(tech, condition, 'Tech Software')}
        ${this._renderCategoryDropdownList(trends, condition, 'Trends')}
      </ul>
    `;
  }

  // helper method to render each sublist in tag category dropdown
  _renderCategoryDropdownList(options, condition, name) {
    let html = '';
    options.forEach(option => {
      html += `<li class="select__option ${
        condition === option ? 'select__option--selected' : ''
      }" data-value='${option}'>
        ${option}
      </li>`;
    });

    return `
        <li class = "options-sections__item">
          <div class = "option-sections__title">${name}:</div>
            <ul class = "option-sections__list">
              ${html}
            </ul>
        </li>
      `;
  }

  // helper method to render tag operator dropdown
  _renderOperatorDropdown(condition) {
    return `
      <ul>
        <li class="select__option ${condition === 'AND' ? 'select__option--selected' : ''}" data-value="AND">AND</li>
        <li class="select__option ${condition === 'OR' ? 'select__option--selected' : ''}" data-value="OR">OR</li>
      </ul>
    `;
  }

  // helper to partition dataset of sites based on conditions
  getPartition(conditions) {
    const category = conditions.filter((_, idx) => idx % 2 === 0);
    const ops = conditions.filter((_, idx) => idx % 2 === 1);

    const partition = this.globalApplicationState.siteData.filter(({ categories }) => {
      let toInclude = categories.includes(category[0]);

      for (let i = 1; i < category.length; i++) {
        const op = ops[i - 1];
        if (op === 'AND') {
          toInclude = toInclude && categories.includes(category[i]);
        } else if (op === 'OR') {
          toInclude = toInclude || categories.includes(category[i]);
        }
      }

      return toInclude;
    });

    const grouped = d3.group(partition, site => `${site.date.getMonth()}/${site.date.getFullYear()}`);

    return [partition, grouped];
  }
}
