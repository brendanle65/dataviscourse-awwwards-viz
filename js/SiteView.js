/** Class representing the site view. */
class SiteView {
  /**
   * Creates a Site View.
   * @param globalApplicationState The shared global application state
   */
  constructor(globalApplicationState) {
    this.globalApplicationState = globalApplicationState;
    this.render(this.globalApplicationState.createdTags[0].grouped.get('9/2022')); //default

    window.addEventListener('selectedDataPoint', e => {
      this.render(e.detail);
      console.log(e.detail);
    });
  }

  render(data) {
    const sectionList = document.querySelector('.sites .section__content');

    sectionList.innerHTML = `
        <ul class = "sites__list">
            ${this._renderSites(data)}
        </ul>
    `;
  }

  _renderSites(data) {
    let html = '';
    data.forEach(({ name, thumbnail, web_url }) => {
      html += `
        <li class = "site">
            <a class = "site__link" href = ${web_url}>
                <img class = "site__image" src = ${thumbnail} />
                <div class = "site__name">${name}</div>
            </a>
        </li>`;
    });

    return html;
  }
}
