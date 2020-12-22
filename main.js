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
    var countPages = list.length/Page.recordPerPage;
    Page.countPages = Math.ceil(countPages);console.log('page:',list.length,countPages,Page.countPages);
    render(list);
}

function pagination(){
    // var countPages = list.length/Page.recordPerPage;
    // Page.countPages = Math.ceil(countPages);console.log('page:',list.length,countPages,Page.countPages);
    var str = '';
    for(i=1;i<=Page.countPages;i++){
        str += `<a href="#page${i}">page${i}</a>`;
    }
    $('#page').html(str);
}    

function render(list){
    var str = '<table>';
    str +="<tr><th id='date'>date</th><th id='name'>name</th><th id='count'>count</th><th id='r'>r</th></tr>";
        list.forEach(function(e,i){
            ++i;
            if(i>Page.countPages){
                return;
            }
            str += `<tr>
            <td>${e.date.getDate()}.${e.date.getMonth()+1}.${e.date.getFullYear('yyyy')}</td>
            <td>${e.name}</td>
            <td>${e.count}</td>
            <td>${e.r}</td>
            </tr>`;
        });
        str += '</table>';
        $('#app').html(str);
        pagination();
} 
    // render(list);

    $('#app').on('click','table tr th',function(e){
        var id = $(this).attr('id');
        var _order;
        _order = (Counts[id] % 2 === 0) ? -1 : 1;
        //     _order = -1;
        // }else{
        //     _order = 1; 
        // }
        Counts[id]++;
        // var field = id;
        // if(id === 'date'){
        //     console.log('date');
        // }else if(id === 'name'){
        //     console.log('name');
        // }
        // list.prototype.mySort = function (field,order){
        function mySort(list,field,order){console.log(10,list,field,order);
            function sOrder(a, b) {
                if (a[field] > b[field]) return order;
                else if (a[field] < b[field]) return -order;
                else return 0;
            }
            // this.sort(sOrder);
            list.sort(sOrder);
        }
        list_new = list.slice();
        mySort(list_new,id,_order);
        // mySort(list,id,_order);
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