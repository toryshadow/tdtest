const botsData = [
  {
    name: 'BotA',
    distance: 50,
    speed: 10,
  },
  {
    name: 'BotA1',
    distance: 100,
    speed: 20,
  },
  {
    name: 'BotB',
    distance: 100,
    speed: 30,
  },
  {
    name: 'BotC',
    distance: 100,
    speed: 50,
  },
];

const main = (towerRange = 50, botsData) => {
  let bots = botsData;
  let turn = 0;
  let loseText = '';

  while(bots.length && !loseText) {
    turn ++;
    let wasKilled = false;

    // sorted by speed to optimize the tower, kill fast enemies first
    let editedBots = bots.sort((a, b) => (a.speed > b.speed) ? -1 : (b.speed > a.speed) ? 1 : 0).map(bot => {
      const { distance, speed } = bot;
      const updatedDistance = distance - speed;

      if (updatedDistance <= towerRange && !wasKilled) {
        wasKilled = true;
        console.log('Bot ' + bot.name + ' was killed');
        return null;
      }

      if (wasKilled && updatedDistance <= 0) {
        const minimumRange = towerRange + -updatedDistance + 1;
        loseText = 'To win, you tower should be at least ' + minimumRange + ' range';
      }
      return { ...bot, distance: updatedDistance };
    });

    bots = editedBots.filter(bot => !!bot);
  }

  if (loseText) {
    alert('Lose on ' + turn + ' turn!!! :( ' + loseText);
  } else {
    alert('Win with ' + turn + ' turn(s)!!!');
  }
};


main(50, botsData);

