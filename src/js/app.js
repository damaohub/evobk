//  倒计时





// var Couter = function (tar) {
//     this.timer = tar
// }

$.fn.Couter = function () {

    function p(s) {
        return s < 10 ? '0' + s: s;
    }
    $(this).each(function () {
        var timer = $(this);
        function countTime() {

            var endTime = $(timer).data('time'),
                now = Date.parse(new Date())/1000,
                leftTime = endTime-now;

            if(leftTime < 0) {
                $(timer).text('00:00');
                window.clearInterval(interval);
                return;
            }else{
                var d,h,m,s;
                d = Math.floor(leftTime/60/60/24);
                h = Math.floor(leftTime/60/60%24);
                m = Math.floor(leftTime/60%60);
                s = Math.floor(leftTime%60);
                if(h == 0){
                    $(timer).text(p(m)+':'+p(s))
                }else{
                    $(timer).text(p(h)+':'+p(m)+':'+p(s))
                }
            }
        }
        var interval = setInterval(countTime,1000);
    })
}


$(function () {

    $(document).on("pageInit", "#page-index", function (e, id, page) {
        $('.timer').Couter()
        $(page).on('click', '.get-task', function (e) {
            var tar = e.target, tarId = $(tar).data("id"), tarTime = $(tar).data("time"),
            idDom = $(".popup-task").find('.J_task-id'),
            timerDom =  $(".popup-task").find('.J_popup-timer');
            idDom.text(tarId)
            console.log(tarTime)
            $(timerDom).data("time",tarTime)
            $(timerDom).Couter()
            $.popup(".popup")


        })

        
    })
  

    
    $(document).on("pageInit",'#page-tixian',function (e ,id, page) {
        var subBtn = $("#subTx")
       $(page).on('input', '#input', function(e) {
           console.log($(this))
           if($(this).val().length !=0) {
               subBtn.removeAttr('disabled')
               subBtn.removeClass('disabled')
           }else {
               subBtn.attr('disabled', true)
               subBtn.addClass('disabled')
           }
       })
        $(page).on('click', '#subTx', function (e) {
            alert(1)

        })
    })

    $(document).on("pageInit",'#page-login',function (e ,id, page) {
        var loginBtn = $("#J_login")
        var usernameInput = $("input[name='username']")
        var passwordInput = $("input[name='password']")
        $(page).on('input', '.login-input', function(e) {
            if($(usernameInput).val().length !== 0 && $(passwordInput).val().length !== 0) {
                loginBtn.removeAttr('disabled')
                loginBtn.removeClass('disabled')
            }else {
                loginBtn.attr('disabled', true)
                loginBtn.addClass('disabled')
            }
        })
        $(loginBtn).on('click', function (e) {
            if($(usernameInput).val().length !== 0 && $(passwordInput).val().length !== 0){
                alert('登录了')
            }else{
                return false
            }
        })
    })


    $.init();
})
