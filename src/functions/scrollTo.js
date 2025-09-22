//Scrolls you to a given element, make sure to give 'ref.current'
const scrollTo = ref => {    //Takes in a refsCurrent
  const comp = ref.current;
  if(!comp) return;   //Returns if the component hasn't been referenced yet
  
  const yCoord = comp.offsetTop;

  const scrollOptions = {
      behavior: 'smooth',
      block: 'start'
  };

  window.scrollTo({ top: yCoord, ...scrollOptions });
}

export default scrollTo;