import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, Button, View } from 'react-native';
import InventoryItem from './components/InventoryItem';

function App(): React.JSX.Element {
  const [inventoryItems, setInventoryItems] = useState([
    { name: 'Apples', initlQuantity: 1, defaultUnit: 'kg' },
    { name: 'Carrots', initlQuantity: 0.5, defaultUnit: 'kg' },
    { name: 'Eggs', initlQuantity: 2, defaultUnit: 'dozen' },
  ]);

  const handleAddItem = () => {
    setInventoryItems(prevItems => {
      const newItems = [
        ...prevItems,
        { name: `Item ${prevItems.length + 1}`, initlQuantity: 0, defaultUnit: 'kg' }
      ];
      
      console.log(newItems); // This will log the updated inventoryItems to the console.
      
      return newItems;
    });
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Button title="Add Produce Item" onPress={handleAddItem} />
      </View>
      {inventoryItems.map((item, index) => (
        <InventoryItem
          key={index}
          name={item.name}
          initlQuantity={item.initlQuantity}
          defaultUnit={item.defaultUnit}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
});

export default App;


// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */

// // import React from 'react';
// // import type {PropsWithChildren} from 'react';

// import React, { useState } from 'react';
// //import { ScrollView, StyleSheet, View, Button } from 'react-native';
// import InventoryItem from './components/InventoryItem';

// import {
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function App(): React.JSX.Element{
//   const[inventoryItems, setInventoryItems] = useState([
//     {name: 'Apples', initlQuantity:1, defaultUnit: 'kg'},
//     {name: 'Carrots', initlQuantity:0.5, defaultUnit: 'kg'},
//     {name: 'Eggs', initlQuantity:2, defaultUnit: 'dozen'},
    
//   ]);

//   const handleAddItem = () =>{
//     setInventoryItems(prevItems => [
//       ...prevItems,
//       {name: `Item ${prevItems.length + 1}`, initlQuantity: 0, defaultUnit: 'kg'};
//     ]);

//   };
//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Button title="Add Produce Item" onPress={handleAddItem} />
//       </View>
//       {invetoryItems.map((item, index) => (
//         <InventoryItem
//           {inventoryItems.map((item, index) => (
//   <InventoryItem
//     key={index}
//     name={item.name}
//     initlQuantity={item.initlQuantity}
//     defaultUnit={item.defaultUnit}

//     key={index}
//     name={item.name}
//     initlQuantity={item.initlQuantity}
//     defaultUnit={item.defaultUnit}
//   />
// ))}

//         />
//       ))}
//     </ScrollView>
//   );
// }

// function Section({children, title}: SectionProps): React.JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// // function App(): React.JSX.Element {
// //   const isDarkMode = useColorScheme() === 'dark';

// //   const backgroundStyle = {
// //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
// //   };

// //   /*
// //    * To keep the template simple and small we're adding padding to prevent view
// //    * from rendering under the System UI.
// //    * For bigger apps the reccomendation is to use `react-native-safe-area-context`:
// //    * https://github.com/AppAndFlow/react-native-safe-area-context
// //    *
// //    * You can read more about it here:
// //    * https://github.com/react-native-community/discussions-and-proposals/discussions/827
// //    */
// //   const safePadding = '5%';

//   // return (
//   //   <View style={backgroundStyle}>
//   //     <StatusBar
//   //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//   //       backgroundColor={backgroundStyle.backgroundColor}
//   //     />
//   //     <ScrollView
//   //       style={backgroundStyle}>
//   //       <View style={{paddingRight: safePadding}}>
//   //         <Header/>
//   //       </View>
//   //       <View
//   //         style={{
//   //           backgroundColor: isDarkMode ? Colors.black : Colors.white,
//   //           paddingHorizontal: safePadding,
//   //           paddingBottom: safePadding,
//   //         }}>
// //           <Section title="Step One">
// //             Edit <Text style={styles.highlight}>App.tsx</Text> to change this
// //             screen and then come back to see your edits.
// //           </Section>
// //           <Section title="See Your Changes">
// //             <ReloadInstructions />
// //           </Section>
// //           <Section title="Debug">
// //             <DebugInstructions />
// //           </Section>
// //           <Section title="Learn More">
// //             Read the docs to discover what to do next:
// //           </Section>
// //           <LearnMoreLinks />
// //         </View>
// //       </ScrollView>
// //     </View>
// //   );
// // }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
