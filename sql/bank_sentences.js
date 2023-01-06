/*
  Alpha/Beta/Launch: home, street, shop, journey, party
  Future additional segments: doctor, restaurant, bank, love

  Forbidden grammatic structures
  perfect tense of any sort - has done, has been doing
  continious tense of any sort - was running, has been running
  possessive - your/her/his/ theirs 
  no plural forms - we/they/yous
  no 3rd person - he/she (except when using other ways to refer to them, like names)
  no negative

  Future sentences:
  'Don\'t come into my room!' (Home)
  'Are you ready to go?' (Home)
  'I can\'t find my keys.' (Home)
*/

module.exports = {
  home: {
    beginner: [
      { s: 'I like this painting.', p: [{ at: 2, is: 'verb' }, { at: 4, is: 'obj' }] },
      { s: 'Please, come in!', p: [{ at: [2, 3], is: 'phr' }] },
      'Dad, can you help me?',
      'This room is nice.',
      'My brother is in the garden.',
      'I like your flat.',
      'This tea is delicious.',
      'I came home early.',
      'This is my room.',
      'Dinner is ready.',
      'Clean your room!',
      'The kitchen is dirty.',
      'My sister is upstairs.',
      'Please, make your bed!',
      'The fridge is empty.',
      'I made breakfast for you.',
      'The coffee machine is broken.',
      'I\'m late for work.',
      'The power is out.',
      'I saw the news yesterday.',
      'My mom is not home.',
      'We like to play in the garden.',
      'This carpet is new.',
      'I water the plants every day.',
    ],
    intermediate: [
      { s: 'Can you pass me the salt?', p: [{ at: [1, 3], is: 'vera' }, { at: 6, is: 'obj' }] },
      { s: 'Where is the restroom?', p: [{ at: 4, is: 'loc' }] },
      { s: 'Do you have a tissue?', p: [{ at: 5, is: 'obj' }] },
      { s: 'The door is on the left.', p: [{ at: 2, is: 'obj' }, { at: 6, is: 'loc' }] },
      { s: 'I should watch TV!', p: [{ at: 4, is: 'obj' }] },
      { s: 'Shoot, I forgot the wine.', p: [{ at: 1, is: 'phr' }, { at: 3, is: 'verp' }, { at: 5, is: 'obj' }] },
      'I brought a guest.',
      'My friend wants to come over.',
      'Your kitchen is very clean.',
      'I usually go to bed at 10 o\'clock.',
      'The toilet is occupied.',
      'Please take your shoes off!',
      'Can you wash the dishes?',
      'Do you want to sit down?',
      'Can you give me the towel?',
      'Can you open the window?',
      'It\'s late, switch the tv off!',
      'It\'s too hot in here.',
      'Please, leave the door open!',
      'Did you take out the trash?',
      'Can I sleep in the double bed?',
      'Be ready in 10 minutes!',
      'My alarm didn\'t go off.',
      'What\'s the wifi password?',
      'I have the same couch.',
      'Can I borrow your jacket?',
      'I used your computer last night.',
      'I forgot to lock the door.',
      ,
    ],
    advanced: [
      'I forgot to do the laundry.',
    ]
  },
  shop: {
    beginner: [
      { s: 'Thank you, goodbye!', p: [{ at: 3, is: 'phr' }] },
    ],
    intermediate: [
      { s: 'How much does one bottle cost?', p: [{ at: 5, is: 'obj' }, { at: 6, is: 'verb' }] },
      'I can\'t reach that shelf.',
    ]
  },
  street: {
    beginner: [
      { s: 'Hi, what is your name?', p: [{ at: 5, is: 'obj' }] },

    ],
    intermediate: [
      { s: 'Go left and walk straight.', p: [{ at: 1, is: 'verc' }, { at: 2, is: 'loc' }, { at: 4, is: 'verc' }] },
      { s: 'Excuse me, you dropped this.', p: [{ at: 4, is: 'verp' }] },

    ]
  },
  journey: {
    beginner: [

    ],
    intermediate: [

    ]
  },
  party: {
    beginner: [

    ],
    intermediate: [

    ]
  }
}