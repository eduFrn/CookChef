import React, { useState } from 'react';
import { StatusBar, View, Text, StyleSheet, TextInput, ImageBackground, Modal, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList, Touchable } from 'react-native';

import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function LoginScreen({ navigation }) {

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [visivel, setVisivel] = useState(false);
  const [msg, setMsg] = useState();

  const verificar = () => {
    if (name == "admin" && password == "123") {
      navigation.navigate('Home')
    } else {
      setMsg("Nome ou senha incorretos.")
      setVisivel(true)
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/fundo-login.png')} resizeMode="cover" style={styles.background} />

      <Image source={require('./assets/logo.png')} style={styles.logoLogin} />

      <View style={styles.box}>
        <View style={[{ flex: 1 }, styles.boxSection]}>
          <Text style={styles.boxTitle}>LOGIN</Text>
        </View>
        <View style={styles.barra} />
        <View style={[{ flex: 3 }, styles.boxSection]}>
          <TextInput
            onChangeText={(text) => setName(text)}
            placeholder="Nome"
            autoFocus={true}
            style={styles.inputLogin}
            placeholderTextColor="gray"
          />
          <TextInput
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder="Senha"
            style={styles.inputLogin}
            placeholderTextColor="gray"
          />
        </View>
        <View style={[{ flex: 1 }, styles.boxSection]}>
          <TouchableOpacity style={styles.botao} onPress={() => verificar()}>
            <Text style={styles.textoBotao}>ENTRAR</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footer}>Empresa TalTal - © 2023 - Todos os direitos reservados</Text>

      <Modal visible={visivel} animationType="fade" transparent={true} onRequestClose={() => setVisivel(false)}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: '#000000cc', alignItems: 'center' }} onPressOut={() => setVisivel(false)}>
          <View style={styles.container}>
            <TouchableWithoutFeedback>
              <View style={styles.errorBox}>
                <View style={[{ flex: 1 }, styles.boxSection]}>
                  <Text style={styles.boxTitle}>ERRO</Text>
                </View>
                <View style={styles.barra} />
                <View style={{ flex: 2, paddingTop: 10 }}>
                  <Text style={{ textAlign: 'center' }}>{msg}</Text>
                </View>
                <View style={[{ flex: 1 }, styles.boxSection]}>
                  <TouchableOpacity style={styles.botao} onPress={() => setVisivel(false)}>
                    <Text style={styles.textoBotao}>SAIR</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

function HomeScreen({ navigation }) {

  const [visivelPesquisa, setVisivelPesquisa] = useState(false)

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Image source={require('./assets/title.png')} style={{ width: 50, height: 50 }} />,
      headerRight: (() =>
        <TouchableOpacity onPress={() => setVisivelPesquisa(!visivelPesquisa)} style={styles.searchButton}>
          <Image source={require('./assets/lupa.png')} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      )
    })
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    })
  }, [navigation]
  )

  const bolos = [
    {
      nome: 'Bolo de Maracujá',
      imagem: <Image source={require('./assets/bolomaracuja.jpg')} style={styles.searchImage}/>
    },
    {
      nome: 'Bolo de Chocolate',
      imagem: <Image source={require('./assets/bolochocolate.jpg')} style={styles.searchImage}/>
    },
    {
      nome: 'Bolo de Laranja',
      imagem: <Image source={require('./assets/bololaranja.jpg')} style={styles.searchImage}/>
    },
    {
      nome: 'Torta de Frango',
      imagem: <Image source={require('./assets/placeholder.jpg')} style={styles.searchImage}/>
    },
    {
      nome: 'Cocada',
      imagem: <Image source={require('./assets/placeholder.jpg')} style={styles.searchImage}/>
    },
    {
      nome: 'Pudim',
      imagem: <Image source={require('./assets/placeholder.jpg')} style={styles.searchImage}/>
    },
    {
      nome: 'Pavê com doce de leite',
      imagem: <Image source={require('./assets/placeholder.jpg')} style={styles.searchImage}/>
    },
    {
      nome: 'Bolinho de ervilha',
      imagem: <Image source={require('./assets/placeholder.jpg')} style={styles.searchImage}/>
    }
  ]

  const [searchResult, setSearchResult] = useState([])

  const pesquisa = (queryString) => {

    setSearchResult([])

    queryString=queryString.trim()
    if (queryString == '') return

    var result=[]
    bolos.forEach((element) => {
      if(element.nome.toLowerCase().includes(queryString.toLowerCase())){
        result.push(element)
      }
    })   
    setSearchResult(result)
  }

  return (
    <View style={styles.homeContent}>
      <ImageBackground source={require('./assets/fundo.png')} resizeMode="cover" style={styles.background} />
      <ScrollView style={{ width: '100%' }}>
        <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>

          <View style={styles.userBox}>
            <View style={{ flex: 1 }}>
              <Text style={styles.welcome}>Bem vindo, admin!</Text>
            </View>
          </View>

          <View style={styles.recipes}>
            <View>
              <Text style={styles.contentTitle}>Receitas mais recentes</Text>
            </View>
            <ScrollView
              style={styles.recipeList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity style={styles.recipeCard} onPress={() => navigation.navigate("Bolo de Maracujá")}>
                <View style={styles.recipePhoto}>
                  <ImageBackground source={require('./assets/bolomaracuja.jpg')} style={{ flex: 1, width: "100%", height: "100%" }} />
                </View>
                <View style={styles.recipeName}>
                  <Text style={styles.recipeNameInner}>Bolo de Maracujá</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.recipeCard} onPress={() => navigation.navigate("Bolo de Chocolate")}>
                <View style={styles.recipePhoto}>
                  <ImageBackground source={require('./assets/bolochocolate.jpg')} style={{ flex: 1, width: "100%", height: "100%" }} />
                </View>
                <View style={styles.recipeName}>
                  <Text style={styles.recipeNameInner}>Bolo de Chocolate</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.recipeCard} onPress={() => navigation.navigate("Bolo de Laranja")}>
                <View style={styles.recipePhoto}>
                  <ImageBackground source={require('./assets/bololaranja.jpg')} style={{ flex: 1, width: "100%", height: "100%" }} />
                </View>
                <View style={styles.recipeName}>
                  <Text style={styles.recipeNameInner}>Bolo de Laranja</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      <Modal animationType='fade' visible={visivelPesquisa} transparent={true} onRequestClose={() => setVisivelPesquisa(!visivelPesquisa)}>
        <TouchableOpacity style={{ flex: 1, backgroundColor: '#000000cc', alignItems: 'center' }} onPressOut={() => setVisivelPesquisa(!visivelPesquisa)}>
          <TouchableWithoutFeedback>
            <View style={{ width: '100%', alignItems:'center'}}>
              <View style={styles.searchBar}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                      placeholder="Pesquisa"
                      style={styles.pesquisa}
                      onChangeText={(text) => pesquisa(text)}
                    />
                  </View>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', padding: 8 }}>
                    <TouchableOpacity onPress={() => setVisivelPesquisa(!visivelPesquisa)} style={styles.searchBoxButton}>
                      <Image source={require('./assets/x.png')} style={styles.closeText} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={styles.searchResult}>
                  <FlatList
                    data={searchResult}
                    renderItem={({ item }) => <Resultado nome={item.nome} imagem={item.imagem}/>}
                    style={{ flex: 1 }}
                  />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const Resultado = ({ nome, imagem }) => (
  <TouchableOpacity style={{flex:1, flexDirection:'row', padding:10}}>
    <View style={{width:140}}>
      {imagem}
    </View>
    <View style={{flex:1, justifyContent:'center'}}>
      <Text style={{fontSize:20, fontWeight:'bold', textTransform:'uppercase'}}>{nome}</Text>
    </View>
  </TouchableOpacity>
)

function Maracuja({ navigation }) {
  return (
    <View style={styles.homeContent}>
      <ImageBackground source={require('./assets/fundo.png')} resizeMode="cover" style={styles.background} />
      <ScrollView
        style={styles.recipeBox}
      >
        <View style={styles.recipeBackgroundSection}>
          <ImageBackground source={require('./assets/bolomaracuja.jpg')} resizeMode="cover" style={styles.recipeBackground} />
          <Image source={require('./assets/bolomaracuja.jpg')} style={styles.recipeImage} />
        </View>
        <View style={{ flex: 3, padding: 16 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Bolo de Maracujá</Text>
          <View style={styles.barra} />
          <View style={styles.recipeSection}>
            <Text style={styles.recipeSectionTitle}>Lista de ingredientes para o bolo</Text>
            <View style={styles.ingredientes}>
              <Text style={styles.ingrediente}>- 3 ovos</Text>
              <Text style={styles.ingrediente}>- 1 xícara de chá de suco de maracujá peneirado e sem sementes</Text>
              <Text style={styles.ingrediente}>- 1 xícara de chá de óleo</Text>
              <Text style={styles.ingrediente}>- 2 xícaras de chá de açúcar</Text>
              <Text style={styles.ingrediente}>- 3 xícaras de chá de farinha de trigo</Text>
              <Text style={styles.ingrediente}>- 1 colher de sopa de fermento em pó</Text>
            </View>
            <Text style={styles.recipeSectionTitle}>Lista de ingredientes para a cobertura</Text>
            <View style={styles.ingredientes}>
              <Text style={styles.ingrediente}>- Suco de 2 ou 3 maracujás sem sementes</Text>
              <Text style={styles.ingrediente}>- 1 lata de creme de leite</Text>
              <Text style={styles.ingrediente}>- 1 lata de leite condensado</Text>
            </View>
          </View>
          <View style={styles.recipeSection}>
            <Text style={styles.recipeSectionTitle}>Modo de preparo do bolo</Text>
            <View style={styles.modoPreparo}>
              <Text style={styles.passo}>1- Bata os 4 primeiros ingredientes no liquidificador.</Text>
              <Text style={styles.passo}>2- Despeje em uma tigela.</Text>
              <Text style={styles.passo}>3- Acrescente a farinha de trigo, aos poucos. Mexa.</Text>
              <Text style={styles.passo}>4- Por último, adicione o fermento e mexa mais um pouco.</Text>
              <Text style={styles.passo}>5- Coloque a massa em uma forma untada e enfarinhada e leve para assar em forno pré-aquecido a 180° graus por aproximadamente 45 minutos..</Text>
            </View>
            <Text style={styles.recipeSectionTitle}>Modo de preparo da cobertura</Text>
            <View style={styles.modoPreparo}>
              <Text style={styles.passo}>1- Bata todos os ingredientes no liquidificador até que tudo se misture. Reserve.</Text>
              <Text style={styles.passo}>2- Coloque a cobertura em cima do bolo quando ele estiver em temperatura ambiente ou gelado.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Chocolate({ navigation }) {
  return (
    <View style={styles.homeContent}>
      <ImageBackground source={require('./assets/fundo.png')} resizeMode="cover" style={styles.background} />
      <ScrollView
        style={styles.recipeBox}
      >
        <View style={styles.recipeBackgroundSection}>
          <ImageBackground source={require('./assets/bolochocolate.jpg')} resizeMode="cover" style={styles.recipeBackground} />
          <Image source={require('./assets/bolochocolate.jpg')} style={styles.recipeImage} />
        </View>
        <View style={{ flex: 3, padding: 16 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Bolo de Chocolate</Text>
          <View style={styles.barra} />
          <View style={styles.recipeSection}>
            <Text style={styles.recipeSectionTitle}>Lista de ingredientes para o bolo</Text>
            <View style={styles.ingredientes}>
              <Text style={styles.ingrediente}>- 2 ovos</Text>
              <Text style={styles.ingrediente}>- 2 xícaras de chá de açúcar</Text>
              <Text style={styles.ingrediente}>- 1 xícara de chá de chocolate em pó (ou achocolatado)</Text>
              <Text style={styles.ingrediente}>- 2 xícaras de chá de farinha de trigo</Text>
              <Text style={styles.ingrediente}>- 1 xícara de chá de água</Text>
              <Text style={styles.ingrediente}>- 1 xícara de chá de óleo</Text>
              <Text style={styles.ingrediente}>- 1 colher de sopa de fermento químico em pó (fermento para bolo)</Text>
            </View>
            <Text style={styles.recipeSectionTitle}>Lista de ingredientes para a cobertura</Text>
            <View style={styles.ingredientes}>
              <Text style={styles.ingrediente}>- 1 caixinha ou lata de leite condensado</Text>
              <Text style={styles.ingrediente}>- 1 colher de sopa de margarina</Text>
              <Text style={styles.ingrediente}>- 3 colheres de sopa de chocolate em pó (ou achocolatado)</Text>
              <Text style={styles.ingrediente}>- 200 gramas de granulado (opcional)</Text>
            </View>
          </View>
          <View style={styles.recipeSection}>
            <Text style={styles.recipeSectionTitle}>Modo de preparo</Text>
            <View style={styles.modoPreparo}>
              <Text style={styles.passo}>1- Reúna todos os ingredientes.</Text>
              <Text style={styles.passo}>2- Em uma tigela grande, coloque os ovos, o açúcar e o chocolate em pó. Misture bem.</Text>
              <Text style={styles.passo}>3- Adicione o trigo e a água e o óleo fervente e mexa.</Text>
              <Text style={styles.passo}>4- Coloque o fermento em pó e incorpore.</Text>
              <Text style={styles.passo}>5- Despeje a massa em uma forma untada e leve para assar em forno preaquecido a 180 ºC até você espetar um palito no meio da massa e ele sair seco.</Text>
              <Text style={styles.passo}>6- Coloque os ingredientes da cobertura (menos o granulado) em uma panela em fogo baixo.</Text>
              <Text style={styles.passo}>7- Misture bem até chegar no ponto de cobertura.</Text>
              <Text style={styles.passo}>8- Deixe amornar e despeje em cima do bolo.</Text>
              <Text style={styles.passo}>9- Salpique o granulado para finalizar e sirva. Bom apetite!</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function Laranja({ navigation }) {
  return (
    <View style={styles.homeContent}>
      <ImageBackground source={require('./assets/fundo.png')} resizeMode="cover" style={styles.background} />
      <ScrollView
        style={styles.recipeBox}
      >
        <View style={styles.recipeBackgroundSection}>
          <ImageBackground source={require('./assets/bololaranja.jpg')} resizeMode="cover" style={styles.recipeBackground} />
          <Image source={require('./assets/bololaranja.jpg')} style={styles.recipeImage} />
        </View>
        <View style={{ flex: 3, padding: 16 }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Bolo de Laranja</Text>
          <View style={styles.barra} />
          <View style={styles.recipeSection}>
            <Text style={styles.recipeSectionTitle}>Lista de ingredientes para o bolo</Text>
            <View style={styles.ingredientes}>
              <Text style={styles.ingrediente}>- 4 ovos</Text>
              <Text style={styles.ingrediente}>- 2 xícaras de chá de açúcar</Text>
              <Text style={styles.ingrediente}>- 1 xícara de chá de óleo</Text>
              <Text style={styles.ingrediente}>- 180 ml de suco de laranja</Text>
              <Text style={styles.ingrediente}>- 2 xícaras de chá de farinha de trigo</Text>
              <Text style={styles.ingrediente}>- Raspas de uma laranja</Text>
              <Text style={styles.ingrediente}>- 1 colher de sopa de fermento químico em pó (fermento para bolo)</Text>
            </View>
            <Text style={styles.recipeSectionTitle}>Lista de ingredientes para a calda</Text>
            <View style={styles.ingredientes}>
              <Text style={styles.ingrediente}>- 1/2 xícara de chá de suco de laranja</Text>
              <Text style={styles.ingrediente}>- 1/4 de xícara de chá de açúcar</Text>
            </View>
          </View>
          <View style={styles.recipeSection}>
            <Text style={styles.recipeSectionTitle}>Modo de preparo</Text>
            <View style={styles.modoPreparo}>
              <Text style={styles.passo}>1- Reúna todos os ingredientes.</Text>
              <Text style={styles.passo}>2- No liquidificador, coloque os ovos, o açúcar, o óleo, o suco de laranja e bata até misturar bem.</Text>
              <Text style={styles.passo}>3- Despeje em um recipiente, adicione a farinha de trigo e misture bem até ficar homogêneo.</Text>
              <Text style={styles.passo}>4- Acrescente as raspas de laranja, o fermento e misture até incorporar.</Text>
              <Text style={styles.passo}>5- Transfira a massa para uma forma untada, enfarinhada e leve ao forno preaquecido a 180 ºC por cerca de 40 minutos, ou até você espetar um palito no meio da massa e ele sair seco.</Text>
              <Text style={styles.passo}>6- Agora reúna todos os ingredientes da calda.</Text>
              <Text style={styles.passo}>7- Em um recipiente pequeno, prepare a calda misturando bem o suco de laranja com o açúcar.</Text>
              <Text style={styles.passo}>8- Desenforme o bolo e despeje a calda por cima.</Text>
              <Text style={styles.passo}>9- Agora é só servir. Bom apetite!</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        hidden={true}
        backgroundColor="#000"
      />
      <Stack.Navigator initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#EA350A',
            borderColor: '#EA350A'
          },
          headerTitleStyle: {
            color: 'white'
          },
	  headerTintColor: 'white'
        }
        }>
        <Stack.Screen name="Login" component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="Home" component={HomeScreen}
          options={{
            headerBackVisible: "false",
            headerLeft: (() => { }),
            headerBackVisible: false,
            headerLeft: () => null,
          }}

        />
        <Stack.Screen name="Bolo de Maracujá" component={Maracuja} />
        <Stack.Screen name="Bolo de Chocolate" component={Chocolate} />
        <Stack.Screen name="Bolo de Laranja" component={Laranja} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  //Estilo da página de Login
  logoLogin: {
    position: 'absolute',
    top: 20,
    width: 125,
    height: 125,
  },
  box: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
    overflow: 'hidden',
    height: 275,
    width: 250,
    borderColor: '#F17C2F',
    borderWidth: 1
  },
  errorBox: {
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 16,
    overflow: 'hidden',
    height: 160,
    width: 225,
    borderColor: '#F17C2F',
    borderWidth: 1,
  },
  boxSection: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  barra: {
    width: '100%',
    borderTopWidth: 1,
    borderColor: 'lightgray',
    margin: 4
  },
  boxTitle: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  inputLogin: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'gray',
    backgroundColor: 'white',
    padding: 8,
    width: '100%',
    marginBottom: 8,
  },
  botao: {
    width: '60%',
    borderRadius: 100,
    backgroundColor: '#EA350A'
  },
  textoBotao: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: 'white',
    margin: 4
  },
  footer: {
    color: 'white',
    position: 'absolute',
    bottom: 10,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center'
  },


  //Estilo da página HOME
  background: {
    position: 'absolute',
    top: 0,
    left:0,
    bottom:0,
    right:0,
    zIndex: -1,
    height: '100%',
    width: '100%',
    flex: 1,
  },
  homeContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF3E5',
  },
  searchButton: {
    padding: 6,
    marginRight: 8,
  },
  pesquisa: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#FED07B',
    fontSize: 16,
    width: '90%'
  },
  userBox: {
    width: '95%',
    height: 120,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FED07B',
    backgroundColor: 'white',
    padding: 20,
    margin: 10,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  searchBoxButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#FFB756',
  },
  closeText: {
    width: 20,
    height: 20,
  },
  recipes: {
    flex: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '95%',
    padding: 20,
    borderWidth: 2,
    borderColor: '#FED07B'
  },
  contentTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  recipeList: {
    flex: 4,
    flexDirection: 'row',
    padding: 10
  },
  recipeCard: {
    width: 160,
    height: 180,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FED07B',
    marginHorizontal: 10,
    marginVertical: 10,
    overflow: 'hidden'
  },
  recipePhoto: {
    flex: 3,
  },
  recipeName: {
    flex: 1,
    textAlign: 'center',
    padding: 4
  },
  recipeNameInner: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'sans-serif',
  },
  searchImage:{
    alignSelf:'center',
    width:100,
    height:100,
    borderRadius:10,
    borderWidth:2,
    borderColor:'#FED07B'
  },
  searchResult:{
    width: '95%',
    height:500,
    backgroundColor: 'lightyellow',
    margin: 10,
    borderRadius: 20
  },

  searchBar:{
    width: '95%',
    height: 60,
    backgroundColor: 'lightyellow',
    margin: 10,
    borderRadius: 20
  },

  // estilização das páginas das receitas
  recipeBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#FED07B',
    borderWidth: 2,
    margin: 10
  },
  recipeBackgroundSection: {
    height: 200,
    backgroundColor: '#442200',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 8
  },
  recipeBackground: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: -10,
    opacity: 0.2,
  },
  recipeImage: {
    height: 180,
    width: 180,
    borderColor: 'white',
    borderRadius: 100,
    borderWidth: 2
  },
  recipeSection: {
    marginVertical: 24
  },
  recipeSectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkred'
  },
  ingrediente: {
    fontSize: 18
  },
  ingredientes: {
    paddingVertical: 12,
  },
  passo: {
    fontSize: 18
  },
  modoPreparo: {
    paddingVertical: 12
  }

})