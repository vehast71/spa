$(function(){
    var Counts = {}
        Counts.date = 0;
        Counts.name = 0;
        Counts.count = 0;
        Counts.r = 0;

    var Page = {}
        Page.recordPerPage = 2;

    const WARNING = "<span style='color:red'>data don't found!</span>";

    var list = [
        {date:new Date(2020,11,01),name:'name1',count:200,r:350},
        {date:new Date(2020,11,02),name:'name2',count:100,r:250},
        {date:new Date(2020,11,03),name:'name3',count:300,r:150},
    ];

init();

function init(){
    Page.recordAll = list.length;
    var countPages = Page.recordAll/Page.recordPerPage;
    Page.countPages = Math.ceil(countPages);console.log('page:',list,list.length,countPages,Page.countPages);
    
    var hash = location.hash;
    var test = [];
    test = hash.match(/#(\d)/);
    if(test !== null){
        hash = Number(test[1]);
    }else{
        hash = 1;
    }
    Page.recordStart = (Number(hash)-1)*Page.recordPerPage;
    if((Page.recordAll-Page.recordStart)<Page.recordPerPage){
        Page.recordFinish = Page.recordAll;
    }else{
        Page.recordFinish = Page.recordStart+Page.recordPerPage;
    }
    render(list);
}

function pagination(){
    var str = '';
    for(i=1;i<=Page.countPages;i++){
        str += `<a href="#${i}">page${i}</a>`;
    }
    $('#page').html(str);
}
$(window).on('hashchange',function(){
// });
// $('#page').on('click','a',function(){//console.log(123,list,Counts);
var hash = location.hash;//console.log('hash-:',hash);
    var test = hash.match(/#(\d)/);//console.log('test-:',test);
    if(test !== null){//console.log('test-not-null:',test);
        hash = Number(test[1]);
    }else{//console.log('test-null:',test);
        hash = 1;
    }
    Page.recordStart = (Number(hash)-1)*Page.recordPerPage;
    if((Page.recordAll-Page.recordStart)<Page.recordPerPage){
        Page.recordFinish = Page.recordAll;
    }else{
        Page.recordFinish = Page.recordStart+Page.recordPerPage;
    }
    //console.log('hash+:',hash,Page,list);
    render(list);    
});

function render(list){//console.log('ii:',list);
    var str = '<table>';
    str +="<tr><th id='date'>date</th><th id='name'>name</th><th id='count'>count</th><th id='r'>r</th></tr>";
        for(i=Page.recordStart;i<Page.recordFinish;i++){console.log('i:',i,list[i]);
            str += `<tr>
            <td>${list[i].date.getDate()}.${list[i].date.getMonth()+1}.${list[i].date.getFullYear('yyyy')}</td>
            <td>${list[i].name}</td>
            <td>${list[i].count}</td>
            <td>${list[i].r}</td>
            </tr>`;
        }
        str += '</table>';
        $('#app').html(str);
        pagination();
}
    $('#app').on('click','table tr th',function(e){
        var id = $(this).attr('id');
        var _order;
        _order = (Counts[id] % 2 === 0) ? -1 : 1;
        Counts[id]++;
        function mySort(list,field,order){console.log(10,list,field,order);
            function sOrder(a, b) {
                if (a[field] > b[field]) return order;
                else if (a[field] < b[field]) return -order;
                else return 0;
            }
            list.sort(sOrder);
        }
        list_new = list.slice();
        mySort(list_new,id,_order);
        render(list_new);console.log(100,list,list_new);
    });

    $('#get').on('click',function(){
        var text = $('#s_text').val();
        var field = $('#s_field').val();
        var icon = $('#s_icon').val();
        var res;
        var list_new = [];console.log(1,text,field,icon);
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
                    res = e[field].indexOf(text);
                    if(res !== -1){
                        return e;
                    }
                break;                
            }
        });
        console.log('1000:',list,list_new);
        if(list_new.length){
            render(list_new);
        }else{
            $('#app').html(WARNING);
        }
        
    });

    $('#reset').on('click',function(){
        render(list);
    });

});