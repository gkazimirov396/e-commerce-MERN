import { Product } from '../models/Product.js';

const rawProducts = [
  {
    title: 'Nike Sneakers',
    description: 'Good for jogging',
    price: 14.99,
    gender: 'female',
    imageUrl: '//unsplash.it/501',
  },
  {
    title: 'Addidas T-Shirt',
    description: 'Recommended for wearing in the GYM',
    price: 6.99,
    gender: 'male',
    imageUrl: '//unsplash.it/521',
  },
  {
    title: 'Nike Backpack',
    description: 'Very Spacious',
    price: 13.55,
    gender: 'male',
    imageUrl: '//unsplash.it/551',
  },
  {
    title: 'Nike Cargo Swim Shorts',
    description: 'Great choice for the summer',
    price: 6.43,
    gender: 'male',
    imageUrl: '//unsplash.it/504',
  },
  {
    title: '11 Degrees Poly Zip Hoodie',
    description:
      'This standard-fit hoodie is made from smooth poly fabric for a laidback feel when the weekend hits.',
    price: 21.32,
    gender: 'male',
    imageUrl: '//unsplash.it/506',
  },
  {
    title: 'Puma Core Sportswear Joggers',
    description:
      'These JD-exclusive joggers are cut from soft, fleecey fabric for snug comfort.',
    price: 29.78,
    gender: 'female',
    imageUrl: '//unsplash.it/576',
  },
  {
    title: 'Nike Bomber Jacket',
    description:
      'This flight-inspired jacket is made from smooth cotton twill fabric, with a breathable mesh lining for cool comfort.',
    price: 34.12,
    gender: 'male',
    imageUrl: '//unsplash.it/512',
  },
  {
    title: 'The North Face Camo Jacket',
    description:
      'This regular-fit jacket is made with smooth, lightweight woven poly for lasting wear.',
    price: 38.45,
    gender: 'male',
    imageUrl: '//unsplash.it/508',
  },
  {
    title: 'Under Armour ColdGear Top',
    description:
      "The men's Under Armour ColdGear LS Compression Crew Top offers an ultra-tight, second-skin fit for a locked-in feel.",
    price: 11.99,
    gender: 'male',
    imageUrl: '//unsplash.it/509',
  },
  {
    title: 'Adidas Womens Bra',
    description:
      'Stay dry when you turn up the heat with a stretchy mesh fabric that absorbs moisture. Adjust the straps for the perfect bounce-reducing fit. Feel secure with a high neckline and racerback.',
    price: 8.99,
    gender: 'female',
    imageUrl: '//unsplash.it/500',
  },
  {
    title: 'Brooks Womens Run Bra',
    description:
      'A hidden bottom band that is fully integrated into the bra offers support where you need it. Laser-cut perforations will keep you cool and comfortable for the duration of your run. 100% Polyester.',
    price: 29.99,
    gender: 'female',
    imageUrl: '//unsplash.it/513',
  },
  {
    title: 'Adidas Cloudfoam Running Shoes',
    description:
      'This product is made with Primegreen, a series of high-performance recycled materials.',
    price: 58.49,
    gender: 'female',
    imageUrl: '//unsplash.it/514',
  },
  {
    title: 'Adidas Edge Running Shoe',
    description:
      'This shoe is made with high-performance recycled materials and features an upper made with 50% recycled content.',
    price: 84.38,
    gender: 'female',
    imageUrl: '//unsplash.it/516',
  },
  {
    title: 'CB Sports Mens Hooded Jacket',
    description:
      'This mid-weight, hooded jacket has you covered on chilly days. Elastic waistband and ribbed cuffs, 80 percent recycled Primaloft insulation, and printed liner in three color combos. ',
    price: 99.99,
    gender: 'male',
    imageUrl: '//unsplash.it/507',
  },
  {
    title: 'Adidas Womens Club Tank Top',
    description:
      "his women's Adidas Club Tank Top is made from lightweight interlock fabric that moves sweat away from your skin, keeping you dry point after point. It's cut for a slim, streamlined fit so nothing gets in the way of your game.",
    price: 40.22,
    gender: 'female',
    imageUrl: '//unsplash.it/523',
  },
  {
    title: 'Adidas Essentials Grey Hoodie',
    description: 'Good for jogging',
    price: 8.99,
    gender: 'male',
    imageUrl: '//unsplash.it/521',
  },
  {
    title: 'Brooks Dash Zip Jacket',
    description:
      'Easy to layer or wear solo, the sustainable Dash ½ Zip delivers lightweight coverage that combines soft warmth with extra breathability in high-heat zones.',
    price: 65.44,
    gender: 'female',
    imageUrl: '//unsplash.it/522',
  },
  {
    title: 'Adidas Jacket',
    description: 'Good for rainy weather',
    price: 19.99,
    gender: 'male',
    imageUrl: '//unsplash.it/525',
  },
  {
    title: 'Converse Shoes',
    description:
      'This low-top sneaker has a unique and stylish look inside and out and features a padded collar and tongue for comfort and style all day long.',
    price: 39.99,
    gender: 'female',
    imageUrl: '//unsplash.it/529',
  },
  {
    title: 'Adidas shoes',
    description: 'Great choice for the gym',
    price: 9.99,
    gender: 'male',
    imageUrl: '//unsplash.it/520',
  },
];

export const initProds = async () => {
  try {
    // await Product.insertMany([...rawProducts]);
    // await Product.deleteMany({});
    await Product.updateMany(
      {},
      {
        $rename: {
          name: 'userName',
        },
      }
    );

    console.log('Prods added');
  } catch (error) {
    console.log(error);
  }
};
