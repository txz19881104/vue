<script type="text/javascript">
const IsLogin = 0;
const UserName = '';

const FictionBackgroundColor = '#fff';
const FictionFontColor = '#000';
const FictionFontSize = 19;
const ComicBackgroundColor = '#fff';

const Success = 0;
const Failed = -1;
const TokenError = "TokenError";


export default {
    IsLogin, //0：未登录  1：普通用户  2：超级用户 5:登出
    UserName,

    FictionBackgroundColor,
    FictionFontColor,
    FictionFontSize,
    ComicBackgroundColor,
    Success,
    Failed,
    TokenError,


    GetSetting: function(setting) {
        if (setting != null) {
            var arr = setting.split(';'); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                if (arr2[0] == 'FictionBackgroundColor') {
                    this.FictionBackgroundColor = arr2[1]; //保存到保存数据的地方
                } else if (arr2[0] == 'FictionFontColor') {
                    this.FictionFontColor = arr2[1];
                } else if (arr2[0] == 'FictionFontSize') {
                    this.FictionFontSize = Number(arr2[1]);
                } else if (arr2[0] == 'ComicBackgroundColor') {
                    this.ComicBackgroundColor = arr2[1];
                }

            }

            var UserSetting = "FictionBackgroundColor=" + this.FictionBackgroundColor + ";FictionFontColor=" + this.FictionFontColor + ";FictionFontSize=" + this.FictionFontSize + ";ComicBackgroundColor=" + this.ComicBackgroundColor;
            localStorage.setItem('UserSetting', UserSetting);
        }

    },

    GetLoginValue: function(login_value) {
        if (login_value != null) {
            var arr = login_value.split(';'); //这里显示的格式需要切割一下自己可输出看下
            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('='); //再次切割
                //判断查找相对应的值
                if (arr2[0] == 'IsLogin') {
                    this.IsLogin = Number(arr2[1]); //保存到保存数据的地方
                } else if (arr2[0] == 'UserName') {
                    this.UserName = arr2[1];
                }
            }
        }
    },

    GetGlobalValue: function() {
        var UserSetting = localStorage.getItem('UserSetting');
        this.GetSetting(UserSetting);

        var LoginValue = localStorage.getItem('LoginValue');
        this.GetLoginValue(LoginValue);

    },

}
</script>