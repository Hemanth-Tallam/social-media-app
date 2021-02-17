function formatDate(date) {
    return new Intl.DateTimeFormat(['ban', 'id']).format(new Date(date));
  }
  
  export default formatDate;