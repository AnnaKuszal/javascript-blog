{
  'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorListLink: Handlebars.compile(document.querySelector('#template-author-list-link').innerHTML)
  };


  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };

  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
    },
    article: {
      title: '.post-title',
      tags: '.post-tags .list',
      author: '.post-author',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };


  const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log (event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');


    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);


    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };


  function generateTitleLinks(customSelector = ''){

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(select.listOf.titles);
    titleList.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(select.all.articles + customSelector);


    let html = '';

    /* [DONE] for each article */
    for(let article of articles){

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');


      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(select.article.title).innerHTML;


      /* [DONE] create HTML of the link */

      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      /* [DONE] insert link into titleList */


      /* [DONE] insert link into html variable */
      html = html + linkHTML;

    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');

    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }

  }

  generateTitleLinks();


  function calculateTagsParams(tags){

    const params = {max: 0, min: 999999};

    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');

      if(tags[tag] > params.max){
        params.max = tags[tag];
      }

      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }

    return params;
  }


  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (opts.tagSizes.count - 1) + 1 );

    return opts.tagSizes.classPrefix + classNumber;

  }



  function generateTags(){

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(select.all.articles);


    /* [DONE] START LOOP: for every article: */
    for(let article of articles){

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(select.article.tags);
      tagsWrapper.innerHTML = '';

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');


      /* [DONE] START LOOP: for each tag */
      for(let tag of articleTagsArray){


        /* [DONE] generate HTML of the link */

        const linkHTMLData = {tagName: tag};
        const linkHTML = templates.tagLink(linkHTMLData);


        /* [DONE] add generated code to html variable */
        html = html + linkHTML;


        /* [NEW] check if this link is NOT already in allTags */
        if(!allTags.hasOwnProperty(tag)){
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }


      /* [DONE] END LOOP: for each tag */
      }

      /* [DONE] insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

      /* [DONE] END LOOP: for every article: */

    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(select.listOf.tags);

    const tagsParams = calculateTagsParams(allTags);


    /* [NEW] create variable for all links HTML code*/
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){

      /* [NEW] generate code of a link and add it to allTagsHTML */

      /* Add 'class' attribute to a generated link */


      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

    /* [NEW] END LOOP: for each tag in allTags: */
    }

    /* [NEW] add html from allTagsHTML to tagList */

    tagList.innerHTML = templates.tagCloudLink(allTagsData);

  }

  generateTags();




  function tagClickHandler(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* [DONE] find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    /* [DONE] START LOOP: for each active tag link */
    for(let activeTag of activeTags){

      /* [DONE] remove class active */
      activeTag.classList.remove('active');

      /* [DONE] END LOOP: for each active tag link */
    }

    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const targetTagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* [DONE] START LOOP: for each found tag link */
    for(let targetTagLink of targetTagLinks){

      /* [DONE] add class active */
      targetTagLink.classList.add('active');

    /* [DONE] END LOOP: for each found tag link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-tags~="' + tag + '"]');
  }


  function addClickListenersToTags(){
  /* [DONE] find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');


    /* [DONE] START LOOP: for each link */
    for(let tagLink of tagLinks){

      /* [DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);


      /* [DONE] END LOOP: for each link */
    }

  }

  addClickListenersToTags();


  function generateAuthors(){
    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};

    /* [DONE]  find all articles */
    const articles = document.querySelectorAll(select.all.articles);

    /* [DONE] START LOOP: for every article*/
    for (let article of articles){
      /* [DONE] find author wrapper and clear it */
      const authorWrapper = article.querySelector(select.article.author);
      authorWrapper.innerHTML = '';

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get author from data-author attribute */
      const author = article.getAttribute('data-author');

      /* [DONE] generate HTML link for author*/

      const linkHTMLData = {authorName: author};
      const linkHTML = templates.authorLink(linkHTMLData);


      /* [DONE] add generated code into html variable*/
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors.hasOwnProperty(author)){
        /* [NEW] add author to allAuthors object */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }


      /* [DONE] insert html with link for author into the author wrapper*/
      authorWrapper.innerHTML=html;

    /* [DONE] END LOOP: for each article*/
    }

    /* [NEW] find list of authors in right column */
    const authorList = document.querySelector(select.listOf.authors);
    authorList.innerHTML = '';


    /* [NEW] create variable 'allAuthorsHTML' for all links HTML code*/

    const allAuthorsData = {authors: []};


    /* [NEW] START LOOP: for each author in allAuthors: */
    for (let author in allAuthors){

      /* [NEW] generate code of a link with authors&numbers and add it to 'allAuthortHTML' */

      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author]
      });

      /* [NEW] END LOOP: for each author in allAuthors: */
    }


    /* [NEW] add html from allAuthorsHTML to authorList */

    authorList.innerHTML = templates.authorListLink(allAuthorsData);


  }

  generateAuthors();


  function authorClickHandler(){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "author" and extract author of the "href" constant */
    const author = href.replace('#author-', '');

    /* [DONE] find all links to an author with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* [DONE] START LOOP: for every found link */
    for(let activeAuthorLink of activeAuthorLinks){

      /* [DONE] remove class active*/
      activeAuthorLink.classList.remove('active');

    /* [DONE] END LOOP: for every found link */
    }

    /* [DONE] find all links with href attribute equal to href in constant "href" */
    const targetAuthorLinks = document.querySelectorAll('a[href="' + href +'"]');

    /* [DONE] START LOOP: for every found link */
    for(let targetAuthorLink of targetAuthorLinks){

      /* [DONE] add class active*/
      targetAuthorLink.classList.add('active');

    /* [DONE] END LOOP: for every found link */
    }

    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author = "' + author + '"]');

  }


  function addClickListenerToAuthors(){
    /* [DONE] find all links to authors in articles*/
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');

    /* [DONE] START LOOP: for every link to author */
    for(let authorLink of authorLinks){

      /* [DONE] add authorClickHandler as event listener to this link */
      authorLink.addEventListener('click', authorClickHandler);


    /* [DONE] END LOOP: for every link to author */
    }

  }

  addClickListenerToAuthors();


}

