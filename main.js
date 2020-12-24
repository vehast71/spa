$(async function(){
    var Counts = {}
        Counts.date = 0;
        Counts.name = 0;
        Counts.count = 0;
        Counts.r = 0;
    var Page = {}
        Page.recordPerPage = 2;
        Page.hash;
//comment if filter hasn't data.        
    const WARNING = "<span class='warning'>data don't found!</span>";
//list - array of data from server
//list_new -array-copy of data for operation: filtering and sorting 
    var list = [];
    var list_new = [];
//get data from remote server
        var get = await fetch('./get-data.php');
        list = await get.json();
    var list_new = list.slice();
//first run render html
init(list);
//render html for current list
function init(list){
    var list = list;
    Page.recordAll = list.length;
    var countPages = Page.recordAll/Page.recordPerPage;
    Page.countPages = Math.ceil(countPages);
    
    var hash = location.hash;
    var test = [];
    test = hash.match(/#(\d)/);
    if(test !== null){
        hash = Number(test[1]);
    }else{
        hash = 1;
    }
    Page.hash = hash;
    page_setting();
    render(list);
}
//add active class for active page link
function addClassActive(){
    $('#page a').removeClass('active');
    $('#page a[href="#'+Page.hash+'"]').addClass('active');
}
//page setting for hash
function page_setting(){
    Page.recordStart = (Number(Page.hash)-1)*Page.recordPerPage;
    if((Page.recordAll-Page.recordStart)<Page.recordPerPage){
        Page.recordFinish = Page.recordAll;
    }else{
        Page.recordFinish = Page.recordStart+Page.recordPerPage;
    }
}
//render pagination with active link
function pagination(){
    var str = '';
    for(i=1;i<=Page.countPages;i++){
        str += `<a href="#${i}">page${i}</a>`;
    }
    $('#page').html(str);
    addClassActive();
}
//handler on hashchange
$(window).on('hashchange',function(){
var hash = location.hash;
    var test = hash.match(/#(\d)/);
    if(test !== null){
        hash = Number(test[1]);
    }else{
        hash = 1;
    }
    Page.hash = hash;
    page_setting();

    var reset = $('#app').attr('reset');
    reset = Number(reset);
    if(reset){
        list_new = [];
        $('#app').attr('reset',0);
    }
    if(!list_new.length){
        list_new = list.slice();
    }
    render(list_new); 
});
//render html
function render(list){
    var list = list;
    var str = '<table>';
    str +="<tr><th id='date'>date</th><th id='name'>name</th><th id='count'>count</th><th id='r'>r</th></tr>";
        for(i=Page.recordStart;i<Page.recordFinish;i++){
            str += `<tr>
            <td>${list[i].date}</td>
            <td>${list[i].name}</td>
            <td>${list[i].count}</td>
            <td>${list[i].r}</td>
            </tr>`;
        }
        str += '</table>';
        $('#app').html(str);
        pagination();
}
//custom sort setting
function mySort(list,field,order){
    function sOrder(a, b) {
        if (a[field] > b[field]) return order;
        else if (a[field] < b[field]) return -order;
        else return 0;
    }
    list.sort(sOrder);
}
//sorting
    $('#app').on('click','table tr th',function(e){
        var id = $(this).attr('id');
        var _order;
        _order = (Counts[id] % 2 === 0) ? -1 : 1;
        Counts[id]++;
        mySort(list_new,id,_order);
        init(list_new);
    });
//filtering
    $('#get').on('click',function(){
        var text = $('#s_text').val();
        var field = $('#s_field').val();
        var icon = $('#s_icon').val();
        var res;
        list_new = list.filter(function(e,i){
            switch(icon){
                case 'eq':
                    if(e[field]===Number(text)) return e;
                break;
                case 'more':
                    if(e[field]>Number(text)) return e;
                break;
                case 'less':
                    if(e[field]<Number(text)) return e;
                break;
                case 'in':
                    if(typeof(e[field]) === 'string'){
                        res = e[field].indexOf(text);
                        if(res !== -1){
                            return e;
                        }                                            
                    }else{
                        $('#app').html(WARNING);
                        $('#page').hide();    
                    }
                break;                
            }
        });
        if(list_new.length){
            init(list_new);
            $('#page').show();
        }else{
            $('#app').html(WARNING);
            $('#page').hide();
        }
    });
//reseting    
    $('#reset').on('click',function(){
        $('#app').attr('reset',1);
        init(list);
        // render(list);
        $('#page').show();
    });
});