define([
    'jquery'
  , 'social-icons'

  , 'text!./template/social.html'
  , 'text!./template/social.css'
  , 'underscore'
  , 'Modernizr'

], function( 
    $
  , socialIcons
  , socialHTML
  , socialStyle
){ 
    var CSS_CLASS = 'js-social-share'                           // класс, по которому должен запускаться плагин
      , $data                                                   // содержит все наборы кнопок на странице
      , $links                                                  // непосредственно ссылки-шары
      , base = {                                                // базовые настройки
            link: location.href                                 // ссылка, которую будут шарить кнопки. может быть переопределена параметром data-url
          , title: window.document.title                        // заголовок, может быть переопределен через data-title   
          , sources: ['fb', 'vk', 'tw', 'od', 'ya', 'jj']       // набор кнопочек, может быть переопределен через data-sources
          , description: $('meta[name="description"]').attr('content')
        }

    function init(){
        updateVars();
        createWrapper();
        bindEvents();
    }

    function updateVars(){
        $data = $('.' + CSS_CLASS);
        $links = $('.' + CSS_CLASS + ' a');
    }

    function bindEvents(){
        $links.live('click', function () {
            var href = $(this).attr('href');
            window.open(
                href,
                '',
                'Toolbar=1,Location=0,Directories=0,Status=0,Menubar=0,Scrollbars=0,Resizable=0,Width=750,Height=600'
            );
            return false;
        });
    }

    /*
     * Добавляем стили на страницу
     * Идем по каждому наборы кнопок.
     * Для каждого набора определяем параметры, переданные в качестве настроек 
     * Формируем html и вставляем на страницу
     * Запускаем подсчет колличества шар
     * Запускаем отдельно подсчет колличества шар для yandex, так как он возвращает глобальный callback
     */
    function createWrapper(){
        if( $data.length > 0) $('head').append('<style type="text/css">' + socialStyle + '</style');
        insertLinks( $data );
        insertIcons();
    }

    /*
     * Вставляем иконки соц сетей.
     * Рисуем их с помощью svg если браузер хороший
     * Или подтягиваем Raphael для отсталых браузеров
     */
    function insertIcons(){
        var iconsObject = socialIcons.init();
        if( Modernizr.svg ){
            $('.module-share__tw').html( socialIcons.getSVG('twitter', '#fff', '-1 0 32 32') );
            $('.module-share__od').html( socialIcons.getSVG('odnk', '#fff', '-1 0 32 32') );
            $('.module-share__vk').html( socialIcons.getSVG('vkontakte', '#fff', '-1 0 32 32') );
            $('.module-share__fb').html( socialIcons.getSVG('facebook', '#fff', '-1 0 32 32') );
            $('.module-share__ya').html( socialIcons.getSVG('yandex', '#fff', '-1 0 32 32') );
            $('.module-share__jj').html( socialIcons.getSVG('livejournal', '#fff', '-1 0 32 32') );
        } else {
            require( ['raphael-amd'], function( Raphael ) {
                $('.module-share__tw').each( function( i ){
                    var id = 'tw' + i;
                    $(this).attr('id', id);
                    var twitterDiv = new Raphael(id, 22, 22);
                    var twitter = twitterDiv.path(iconsObject.twitter.code);
                    twitter.scale(0.7, 0.7, -1, -4);
                    twitter.attr( iconsObject.twitter.attr );
                });
                $('.module-share__od').each( function( i ){
                    var id = 'odnk' + i;
                    $(this).attr('id', id);
                    var odnkDiv = new Raphael(id, 22, 22);
                    var odnk = odnkDiv.path(iconsObject.odnk.code);
                    odnk.scale(0.7, 0.7, -1, -4);
                    odnk.attr( iconsObject.odnk.attr );
                });
                $('.module-share__vk').each( function( i ){
                    var id = 'vk' + i;
                    $(this).attr('id', id);
                    var vkontakteDiv = new Raphael(id, 22, 22);
                    var vkontakte = vkontakteDiv.path(iconsObject.vkontakte.code);
                    vkontakte.scale(0.7, 0.7, -2, -2);
                    vkontakte.attr( iconsObject.vkontakte.attr ); 
                });
                $('.module-share__fb').each( function( i ){
                    var id = 'fb' + i;
                    $(this).attr('id', id);
                    var facebookDiv = new Raphael(id, 22, 22);
                    var facebook = facebookDiv.path(iconsObject.facebook.code);
                    facebook.scale(0.7, 0.7, -5, -3);
                    facebook.attr( iconsObject.facebook.attr ); 
                });
                $('.module-share__ya').each( function( i ){
                    var id = 'ya' + i;
                    $(this).attr('id', id);
                    var yandexDiv = new Raphael(id, 22, 22);
                    var yandex = yandexDiv.path(iconsObject.yandex.code);
                    yandex.scale(0.7, 0.7, -4, -4);
                    yandex.attr( iconsObject.yandex.attr ); 
                });
                $('.module-share__jj').each( function( i ){
                    var id = 'jj' + i;
                    $(this).attr('id', id);
                    var livejournalDiv = new Raphael(id, 22, 22);
                    var livejournal = livejournalDiv.path(iconsObject.livejournal.code);
                    livejournal.scale(0.7, 0.7, -4, -5);
                    livejournal.attr( iconsObject.livejournal.attr ); 
                });
            });
        }
    }

    function insertLinks( $data ){
        $data.each( function( number ){
            var url = $(this).attr( 'data-url' )
              , sources = $(this).attr( 'data-sources' )
              , title = $(this).attr( 'data-title' )
              , counterFlag = $(this).attr( 'data-counter' )
              , html = '<div class="module-share__data">';

            if( sources ){
                sources = sources.split(',');
            } else {
                sources = base.sources;
            }
            for( var i = 0; i < sources.length; i++ ){
                html = html + _.template(socialHTML, {
                      NAME: sources[i]
                    , URL: getLink( sources[i], url, title )
                    , NUMBER: number
                });
            }
            html = html + '<div class="clear"></div></div>';
            $(this).html( html );  
            if( counterFlag !== 'false' ){
                if( url ){
                    url = 'http://' + url.replace('http://', '');
                } else {
                    url = '';
                }
                
                countShare( $(this), url, number );
            }
        });

        countYandex();
    }

    /*
     * Формируем ссылочки, по которым будем шарить
     */
    function getLink( social, link, title ){
        var url = '';
        if( link ){
            link = encodeURIComponent('http://' + link.replace('http://', ''));
        } else {
            link = encodeURIComponent(base.link);
        }
        if( !title ){
            title = base.title;
        }
        switch( social ){
            case 'fb':
                url = 'https://facebook.com/sharer/sharer.php?u=' + link;
                break;
            case 'vk':
                url = 'http://vkontakte.ru/share.php?url=' + link;
                break;
            case 'tw':
                url = 'http://twitter.com/share?url=' + link + '&text=' + encodeURIComponent(title);
                break;
            case 'od':
                url = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=' + link;
                break;
            case 'jj':
                url = 'http://www.livejournal.com/update.bml?href=' + link + '&subject=' + encodeURIComponent(title) + '&event=' + encodeURIComponent(base.description + '  Читайте тут: ') + link;
                break;
            case 'ya':
                url = 'http://share.yandex.ru/go.xml?service=yaru&url=' + link + '&title=' + encodeURIComponent(title) + '&body=' + encodeURIComponent(base.description);
                break;
            default:
                url = '#';
        }
        return url;
    }

    /*
     * Функция аяксовых запросов на колличество шар
     */
    function countShare( $container, pageuri, number ){
        // facebook
        $.getJSON('http://api.facebook.com/restserver.php?method=links.getStats&callback=?&urls=' + pageuri + '&format=json', function(data) {
            if( data[0] && data[0].total_count > 0){
                $container.find('.module-share__number__fb').text(data[0].total_count).parent().removeClass('hidden');
            }
        });

        // vkontakte
        if (!window.VK) window.VK = {};
        if (!VK.Share) VK.Share = {};        
        VK.Share.count = function(index, count){
            if( count > 0 ){
                $('.js-vk-callback-' + index).text(count).parent().removeClass('hidden');
            }
        };
        $.ajax({
            url: 'http://vkontakte.ru/share.php?act=count&index=' + number + '&url=' + pageuri + '&format=json&callback=?', 
            dataType: 'jsonp'
        });
        // twitter
        $.getJSON('http://urls.api.twitter.com/1/urls/count.json?url=' + pageuri + '&callback=?', function(data) {
            if( data.count > 0 ){
                $container.find('.module-share__number__tw').text(data.count).parent().removeClass('hidden');
            }
        });
        // odnoklassniki
        $.ajax( {
            url: 'http://www.odnoklassniki.ru/dk?st.cmd=shareData&ref=' + pageuri,
            dataType: 'jsonp',
            jsonp: 'cb',
            success: function( data ){
                if( data.count > 0 ){
                    $container.find('.module-share__number__od').text(data.count).parent().removeClass('hidden');
                }
            }
        });
    }

    /*
     * Yandex идиоты. Считаем шары для них отдельно.
     * Берем все ссылки yandex и передаем в функцию запроса статистики
     */
    function countYandex( pageuri ){
        var $yandex = $('.module-share__ya');
        getYandexCounter( $yandex );
    }

    /*
     * Запрашивает значения счетчика для первого элемента из массива.
     * Когда значение получено, то первый элемент удаляется и функция вызывается снова.
     */
    function getYandexCounter( $yandex ){
        if( $yandex.length > 0 ){
            var $item = $($yandex[0])
              , $container = $item.parent().parent().parent()
              , pageuri = $container.attr('data-url')
              , counterFlag = $container.attr('data-counter');

            if( counterFlag !== 'false' ){
                if( pageuri ){
                    pageuri = 'http://' + pageuri.replace('http://', '');
                } else {
                    pageuri = base.link;
                }
            
                Ya = {};
                Ya.Share = {};
                Ya.Share.showCounter = function(data){
                    if( data > 0 ){
                        $container.find('.module-share__number__ya').text(data).parent().removeClass('hidden');
                        $yandex = $.map( $yandex, function(n, i){
                           if( i > 0) return n;
                        });
                        getYandexCounter( $yandex );
                    }
                };
                $.ajax( {
                    url: 'http://wow.ya.ru/ajax/share-counter.xml?url=' + pageuri,
                    dataType: 'jsonp'
                });
            } else {
                $yandex = $.map( $yandex, function(n, i){
                   if( i > 0) return n;
                });
                getYandexCounter( $yandex );
            }
        }
    }

    return {
        init: init
      , insertLinks: insertLinks
    }
});