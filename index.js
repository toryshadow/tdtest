const botsData = [
  {
    name: 'BotA',
    distance: 100,
    speed: 10,
  },
  {
    name: 'BotA',
    distance: 100,
    speed: 10,
  },
  {
    name: 'BotB',
    distance: 50,
    speed: 20,
  },
  {
    name: 'BotC',
    distance: 100,
    speed: 20,
  },
];

const main = (towerRange = 50, botsData) => {
  let bots = botsData;
  let turn = 0;
  let win = true;

  while(bots.length && win) {
    turn ++;
    let wasKilled = false;

    let editedBots = bots.map(bot => {
      const { distance, speed } = bot;
      const updatedDistance = distance - speed;

      if (updatedDistance <= towerRange && !wasKilled) {
        wasKilled = true;
        console.log('Bot ' + bot.name + ' was killed');
        return null;
      }

      if (wasKilled && updatedDistance <= 0) {
        win = false;
      }
      return { ...bot, distance: updatedDistance };
    });

    bots = editedBots.filter(bot => !!bot);
  }

  if (win) {
    alert('Win with ' + turn + ' turn(s)!!!');
  } else {
    alert('Loose on ' + turn + ' turn!!! :(');
  }
};


main(50, botsData);

