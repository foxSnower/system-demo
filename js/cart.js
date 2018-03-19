Vue.filter('formatMoney', function(money) {
	return '¥ ' + money.toFixed(2) + '元';
});

new Vue({
	el: '#app',
	data: {
		productList: [],
		checkedAll: false,
		totalMoney:0,
		delFlag:false,
		delIndex:0
//		checkedText: '全选'
	},
	filters: {
		//		formatMoney: function(money) {
		//			return '¥ ' + money.toFixed(2) + '元';
		//		}
	},
	mounted: function() {
		var _this = this;
		this.$nextTick(function() {
			_this.initView();
		})
	},
	methods: {
		initView: function() {
			var _this = this;
			this.$http.get('data/cartData.json', {
				"id": 123
			}).then(function(res) {
				var data = res.data;
				_this.productList = data.result.list;

			})
		},
		changeQuantity: function(item, type) {
			if(type > 0) {
				item.productQuantity++;
			} else {
				if(item.productQuantity <= 1) {
					item.productQuantity = 1;
				} else {
					item.productQuantity--;
				}
			}
			this.computedTotalMoney();
		},
		changeChecked: function(item) {
			if(typeof item.checked == 'undefined') {
				this.$set(item, "checked", true);
			} else {
				item.checked = !item.checked;
			}
			var isAll = this.productList.every(function(item, index) {
				return item.checked === true;
			});
			this.checkedAll = isAll ? true : false;
			this.computedTotalMoney();
		},
		changeCheckedAll: function() {
			var _this = this;
			this.checkedAll = !this.checkedAll;
			this.productList.forEach(function(item, index) {
				if(typeof item.checked == 'undefined') {
					_this.$set(item, "checked", true);
				} else {
					item.checked = _this.checkedAll;
				}
			});
			this.computedTotalMoney();
		},
		delProduct:function(){
			this.delFlag=false;
			this.productList.splice(this.delIndex,1);
			this.computedTotalMoney();
		},
		computedTotalMoney:function(){
			var _this = this;
			_this.totalMoney=0;
			this.productList.forEach(function(item, index) {
				if(item.checked == true) {
					_this.totalMoney +=item.productPrice*item.productQuantity; 
				}
			});
		}
		
	},
	computed:{
		checkedText: function() {
			if(this.checkedAll) {
				return '取消全选';
			} else {
				return  '全选';
			}
		},
	}
})
