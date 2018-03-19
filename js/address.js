new Vue({
	el: '#app',
	data: {
		addressList: [],
		defaultList: 3,
		curIndex: 0,
		shoppingMethod:1
	},
	mounted: function() {
		this.$nextTick(function() {
			this.initView();
		})
	},
	methods: {
		initView: function() {
			var _this = this;
			this.$http.get('data/address.json', {
				id: '123'
			}).then(function(res) {
				var data = res.data;
				_this.addressList = data.result;

			})
		},
		setDefault:function(indexFlag){
			this.addressList.forEach(function(item,index){
				if(indexFlag==index){
					item.isDefault=true;
				}else{
					item.isDefault=false;
				}
			})
		}
	},
	computed: {
		filterAddressList: function() {
			return this.addressList.slice(0, this.defaultList);
		}
	}

})