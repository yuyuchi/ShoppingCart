new Vue({
  el: '#cart-app',
  data: {
    currPage: 1,
    countOfPage: 10,
    items: [],
    searchName: '',
    cart: [],
    total: 0
  },
  methods: {
    addItem(index) {
      var item = this.items[index];
      var found = false;
      this.total += item.price;

      for (let i = 0; i < this.cart.length; i++) {
        if (this.cart[i].id === item.id) {
          found = true;
          this.cart[i].qty++;
          break;
        }
      }

      if (!found) {
        this.cart.push({
          id: item.id,
          name: item.name,
          price: item.price,
          qty: 1
        });
      }
    },

    add(item) {
      item.qty++;
      this.total += item.price;
    },

    remove(item) {
      item.qty--;
      this.total -= item.price;

      if (item.qty === 0) {
        this.cart.splice(this.cart.findIndex((d) => {
          return d.id === item.id
        }), 1);
      }
    },
    setPage(page) {
      if (page <= 0 || page > this.totalPage) {
        return;
      }
      this.currPage = page;
    }
  },
  computed: {
    totalPage: function() {
      return Math.ceil(this.filteredItems.length / this.countOfPage);
    },
    pageStart: function() {
      return (this.currPage - 1) * this.countOfPage;
    },
    filteredItems() {
      var searchName = this.searchName;

      return (this.searchName.trim() !== '') ?
        this.items.filter(function(d) {
          return d.name.indexOf(searchName) > -1;
        }) : this.items;
    }
  },
  created() {
    axios.get('./pros-list.json')
      .then((response) => {
        this.items = response.data;
      });
  }
});