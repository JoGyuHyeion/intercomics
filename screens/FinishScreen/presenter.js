import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  FlatList,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
  DayTabs,
  FooterModal,
  SmallCard,
  OrderByModal,
  FooterButton
} from "../../components";
import { List, ListItem, Avatar } from "react-native-elements";
const dayList = [
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
  "sun",
  "etc",
  "finish"
];

class FinishScreen extends Component {
  state = {
    isVisible: false,
    isOvisible: false,
    platformList: "all",
    orderBy: "newupdate",
    day: 8,
    isScroll: false
  };

  handleEnd = () => {
    if (!this.state.isScroll && !this.props.toonList[dayList[8]].isLast) {
      this.setState({ isScroll: true });
      this.props.WebtoonActions.getWebtoon(
        this.state.platformList,
        8,
        this.state.orderBy
      ).then(() => {
        this.setState({
          isScroll: false
        });
      });
    }
  };

  handleModal = () => {
    this.setState({
      isVisible: !this.state.isVisible
    });
  };

  handleOderModal = () => {
    this.setState({
      isOvisible: !this.state.isOvisible
    });
  };

  handlePlatform = platformList => {
    if (platformList != this.state.platformList) {
      this.setState({ platformList: platformList });
      this.props.WebtoonActions.getWebtoon(
        platformList,
        this.state.day,
        this.state.orderBy
      );
    }
  };

  handleOrderBy = orderBy => {
    this.setState({
      orderBy
    });
  };

  handleDay = day => {
    this.setState({
      day: day
    });
    this.props.WebtoonActions.getWebtoon(
      this.state.platformList,
      day,
      this.state.orderBy
    );
  };

  handleOnClick = item => {
    this.props.navigation.navigate("episode", { webtoon: item });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#283442" }}>
        <OrderByModal
          isVisible={this.state.isOvisible}
          handleModal={this.handleOderModal}
          handlePlatform={this.handleOrderBy}
        />
        <FooterModal
          isVisible={this.state.isVisible}
          handleModal={this.handleModal}
          handlePlatform={this.handlePlatform}
        />
        <View
          style={{
            width: width,
            height: 1,
            shadowOpacity: 0.4,
            shadowOffset: { height: 1 }
          }}
        />
        <FlatList
          style={{ marginTop: 5 }}
          data={this.props.finishList}
          bounces={!this.props.isLast}
          onEndReached={() => {
            this.handleEnd();
          }}
          onEndReachedThreshold={0.1}
          keyExtractor={(x, i) => i}
          numColumns={3}
          ListFooterComponent={() =>
            this.props.isPending ? (
              <ActivityIndicator
                style={{ marginTop: 10 }}
                size="large"
                color="white"
                animating
              />
            ) : null
          }
          renderItem={({ item }) => (
            <SmallCard
              webtoonName={item.webtoonName}
              thumb={item.webtoonThumbnail_s}
              platform={item.platform}
              item={item}
              handleOnClick={() => this.handleOnClick(item)}
            />
          )}
        />
        <FooterButton
          handleModal={this.handleModal}
          handleOderModal={this.handleOderModal}
          platformList={this.state.platformList}
        />
      </View>
    );
  }
}
const { width, height } = Dimensions.get("window");

export default FinishScreen;
