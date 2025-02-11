function timeDistance (timestamp) {
  const date = new Date(timestamp)
  const differenceSeconds = Math.abs(new Date() - date)/1000;
  if(differenceSeconds == 1) {
    return "1 secondo"
  } else if(differenceSeconds < 60) {
    return differenceSeconds.toFixed() + " secondi"
  } else if(differenceSeconds < 60*2) {
    return "1 minuto"
  } else if(differenceSeconds < 60*60) {
    return (differenceSeconds/60).toFixed() + " minuti"
  } else if(differenceSeconds < 60*60*2) {
    return "circa 1 ora"
  } else if(differenceSeconds < 60*60*24) {
    return "circa " + (differenceSeconds/(60*60)).toFixed() + " ore"
  } else if(differenceSeconds < 60*60*24*2) {
    return "circa 1 giorno"
  } else if(differenceSeconds < 60*60*24*30) {
    return "circa " + (differenceSeconds/(60*60*24)).toFixed() + " giorni"
  } else if(differenceSeconds < (60*60*24*30*2)) {
    return "circa 1 mese"
  } else {
    return "circa " + (differenceSeconds/(60*60*24*30)).toFixed() + " mesi"
  }
}

function categoryToString (category) {
  switch (category) {
      case 'animale-pericoloso': return "Animale pericoloso";
      case 'calamita-ambientale': return "Calamità ambientale";
      case 'sentiero-inagibile': return "Sentiero inagibile";
      case 'altro': return "Pericolo";
      default: return "err";
  }
}

function dateToDateString(timestamp) {
  return timestamp.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "/" 
  + (timestamp.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "/" 
  + timestamp.getFullYear().toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping:false})
}

function dateToTimeString(timestamp) {
  return timestamp.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + 
  timestamp.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + 
  timestamp.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
}

export {timeDistance, categoryToString, dateToDateString, dateToTimeString}