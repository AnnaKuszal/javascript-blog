{
  'use strict';

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
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };

  /* PRZENOSIMY KOD NA KONIEC NOWEJ FUNKCJI

  const links = document.querySelectorAll('.titles a');
  console.log(links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  */

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-';



  function generateTitleLinks(customSelector = ''){
    console.log('Wygenerowano listę linków!');
    console.log('custom selector:', customSelector);

    /* [DONE] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    /* [DONE] find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('ARTICLES', articles);

    let html = '';

    /* [DONE] for each article */
    for(let article of articles){

      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleId);

      /* [DONE] find the title element */
      /* [DONE] get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);


      /* [DONE] create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* [DONE] insert link into titleList */
      //titleList.innerHTML = titleList.innerHTML + linkHTML;  kod przed optymalizacją
      //titleList.insertAdjacentHTML('beforeend', linkHTML);  // kod po optymalizacji

      /* [DONE] insert link into html variable */
      html = html + linkHTML;

    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);
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

    console.log('TAGS: ', tags);
    return params;
  }


  function calculateTagClass(count, params){
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );

    return optCloudClassPrefix + classNumber;

  }



  function generateTags(){

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
    console.log('ALL TAGS: ', allTags);

    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);


    /* [DONE] START LOOP: for every article: */
    for(let article of articles){
      console.log(article);

      /* [DONE] find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      tagsWrapper.innerHTML = '';

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* [DONE] split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* [DONE] START LOOP: for each tag */
      for(let tag of articleTagsArray){
        console.log(tag);

        /* [DONE] generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li> ';
        console.log(linkHTML);

        /* [DONE] add generated code to html variable */
        html = html + linkHTML;
        console.log(html);

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
    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams: ', tagsParams);

    /* [NEW] create variable for all links HTML code*/
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for(let tag in allTags){
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + '</a>' + ' ' + '(' + allTags[tag] + ')</li> ';
      //console.log('allTagsHTML: ', allTagsHTML);




      /* Add 'class' attribute to a generated link */
      //const tagLinkHTML = '<li><a class ="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a>' + ' ' + '(' + allTags[tag] + ')</li>';   pelny kod (z liczbą wyświetleń danego taga)
      const tagLinkHTML = '<li><a class ="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a>' + ' ' + '</li>';
      console.log('tagLinkHTML: ', tagLinkHTML);

      allTagsHTML += tagLinkHTML;



    /* [NEW] END LOOP: for each tag in allTags: */
    }

    /* [NEW] add html from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;

  }

  generateTags();




  function tagClickHandler(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    //console.log('clickedElement:', clickedElement);

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

    //generateTitleLinks('[data-tags~="code"]');
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }


  function addClickListenersToTags(){
  /* [DONE] find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');


    /* [DONE] START LOOP: for each link */
    for(let tagLink of tagLinks){

      /* [DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      console.log('Listener został dodany');

      /* [DONE] END LOOP: for each link */
    }

  }

  addClickListenersToTags();


  function generateAuthors(){
    console.log('Wygenerowano nazwiska autorów');
    /* [DONE]  find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('Articles found: ', articles);

    /* [DONE] START LOOP: for every article*/
    for (let article of articles){
      /* [DONE] find author wrapper and clear it */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      authorWrapper.innerHTML='';

      /* [DONE] make html variable with empty string */
      let html = '';

      /* [DONE] get author from data-author attribute */
      const author = article.getAttribute('data-author');
      console.log(author);

      /* [DONE] generate HTML link for author*/
      const linkHTML = '<ul class="list"><li><a href="#author-' + author + '">' + author + '</a></li> </ul>';
      console.log(linkHTML);

      /* [DONE] add generated code into html variable*/
      html = html + linkHTML;

      /* [DONE] insert html with link for author into the author wrapper*/
      authorWrapper.innerHTML=linkHTML;

    /* [DONE] END LOOP: for each article*/
    }
  }

  generateAuthors();


  function authorClickHandler(){
    /* [DONE] prevent default action for this event */
    event.preventDefault();

    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href  = clickedElement.getAttribute('href');

    /* [DONE] make a new constant "author" and extract author of the "href" constant */
    const author  = href.replace('#author-', '');

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
    //console.log(authorLinks);

    /* [DONE] START LOOP: for every link to author */
    for(let authorLink of authorLinks){

      /* [DONE] add authorClickHandler as event listener to this link */
      authorLink.addEventListener('click', authorClickHandler);


    /* [DONE] END LOOP: for every link to author */
    }

  }

  addClickListenerToAuthors();


}

/*
document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */
