import React, {Component} from 'react';
import {Container, Content, Icon, Item, List, ListItem, Separator, Text, View} from "native-base";
import {ActivityIndicator, Alert, Image, TextInput, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import String from '../../providers/localization';

import styles from './location.style';
import THeader from "../../components/header/header";
import {colors} from "../../config/index";
import {
    deleteSavedLocation,
    getPositionDetailsByName,
    getSavedLocations,
    getSearchLocations
} from '../../actions/location';
import {setMapMovePosition} from '../../actions/mapConfig';
import Loader from "../../components/loader/loader";

const heartO = require('../../assets/icons/heart-o.png');
const heart = require('../../assets/icons/heart.png');


class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            search: '',
            nearByLocations: [],
            savedAddressList: [],
            addressList: [],
            loader: true,
            inputBusy: false,
            isSearching: false
        };
        this.updateSavedLocations = this.updateSavedLocations.bind(this);
        this.removeSavedLocation = this.removeSavedLocation.bind(this);
        this.openLocationOnMap = this.openLocationOnMap.bind(this);
        this.onChangeQueryText = this.onChangeQueryText.bind(this);
        this.onSearchResultClicked = this.onSearchResultClicked.bind(this);
    }

    componentWillMount() {
        this.updateSavedLocations();
    }

    componentDidMount() {
        this.setState({loader: false});
    }

    updateSavedLocations = async () => {
        console.log('called')
        await this.props.dispatch(getSavedLocations());
        if (this.props.locationReducer.isSuccess)
            await this.setState({
                savedAddressList: this.props.locationReducer.savedLocations || []
            });
    };


    openLocationOnMap = (position) => {
        this.props.dispatch(setMapMovePosition(true, position));
        this.props.navigation.navigate('Map');
    };

    removeSavedLocation = async (id) => {
        Alert.alert(
            'Confirm Deleting',
            'Are you sure to delete saved location',
            [
                {
                    text: 'Yes', onPress: async () => {
                        this.setState({loader: true});
                        await this.props.dispatch(deleteSavedLocation(id));
                        if (this.props.locationReducer.isSuccess)
                            await this.updateSavedLocations();
                        this.setState({loader: false});
                    }
                },
                {
                    text: 'No', onPress: () => {
                    }
                },
            ],
            {cancelable: true},
        );

    };

    onChangeQueryText = async () => {
        if (this.state.typingTimeout)
            clearTimeout(this.state.typingTimeout);

        this.setState({
            typingTimeout: setTimeout(async function () {
                await this.props.dispatch(getSearchLocations(this.state.query, {
                    latitude: this.props.locationReducer.positionDetails.geometry.location.lat,
                    longitude: this.props.locationReducer.positionDetails.geometry.location.lng
                }))
            }.bind(this), 570),
            addressList: this.props.locationReducer.searchList,
            inputBusy: false
        });
    };

    onSearchResultClicked = async (addressName) => {
        await this.props.dispatch(getPositionDetailsByName(addressName));
        this.openLocationOnMap(this.props.locationReducer.searchAddressPosition);
    };


    render() {
        // console.log(this.props.locationReducer.savedLocations);
        return (
            <Container>
                {this.state.loader && <Loader {...this.props} />}
                <THeader {...this.props} title={String.headers.location}/>
                <Content bounces={true} style={{backgroundColor: colors.white}}>
                    <View style={styles.content}>
                        <View style={styles.searchBox}>
                            <Item style={styles.searchItemBox}>
                                <Icon name="ios-search" style={styles.searchIcon}/>
                                <TextInput placeholder="Search location"
                                           style={styles.searchInput}
                                           defaultValue={this.state.query}
                                           returnKeyType="search"
                                           onChangeText={async (query) => {
                                               await this.setState({query, isSearching: true, inputBusy: true});
                                               this.onChangeQueryText();
                                           }}
                                           onSubmitEditing={this.onChangeQueryText}
                                />
                            </Item>
                        </View>

                        {
                            /**
                             * Search Result Items
                             * */
                            this.state.isSearching &&
                            (
                                <View style={styles.searchList}>
                                    {
                                        <List style={styles.list}>
                                            <Separator bordered style={styles.separator}>
                                                <Text style={styles.separatorText}>Search Result</Text>
                                            </Separator>
                                            {
                                                (
                                                    this.state.addressList.length == 0 &&
                                                    this.props.locationReducer.isSuccess &&
                                                    !this.state.inputBusy
                                                ) &&
                                                <ListItem style={styles.addressItem}>
                                                    <View style={styles.addressView}>
                                                        <Text style={styles.title} numberOfLines={1}>
                                                            No address found
                                                        </Text>
                                                    </View>
                                                </ListItem>
                                            }
                                            {
                                                (
                                                    this.state.addressList.length == 0 &&
                                                    !this.props.locationReducer.isSuccess ||
                                                    this.state.addressList.length == 0 &&
                                                    this.state.inputBusy
                                                ) &&
                                                <ListItem style={styles.addressItem}>
                                                    <View style={styles.addressView}>
                                                        <ActivityIndicator color={colors.gray} size={'small'}/>
                                                        <Text style={styles.titleMessage} numberOfLines={1}>
                                                            Searching ...
                                                        </Text>
                                                    </View>
                                                </ListItem>
                                            }
                                            {
                                                this.state.addressList.map((address, index) => {
                                                    return <ListItem key={index}
                                                                     style={[styles.addressItem, {height: 45}]}>
                                                        <View style={styles.locationIconView}>
                                                            <Icon name={'map-marker'}
                                                                  type={'FontAwesome5'}
                                                                  style={styles.locationIcon}>
                                                            </Icon>
                                                        </View>
                                                        <TouchableOpacity style={[styles.addressBtn]}
                                                                          onPress={()=>this.onSearchResultClicked(address)}>
                                                            <Text style={styles.title} numberOfLines={1}>
                                                                {address}
                                                            </Text>
                                                        </TouchableOpacity>
                                                        <TouchableOpacity style={styles.addressLike}>
                                                            {/*<Image source={heartO} style={styles.imageStyle}/>*/}
                                                        </TouchableOpacity>
                                                    </ListItem>
                                                })
                                            }
                                        </List>
                                    }
                                </View>
                            )


                        }

                        {
                            /**
                             * Saved Location Items
                             * */
                            this.state.savedAddressList.length != 0 &&
                            <View style={styles.searchList}>
                                {
                                    <List style={styles.list}>
                                        <Separator bordered style={styles.separator}>
                                            <Text style={styles.separatorText}>Saved Location</Text>
                                        </Separator>
                                        {
                                            this.state.savedAddressList.map((address, index) => {
                                                return <ListItem key={index} style={styles.addressItem}>
                                                    <View style={styles.locationIconView}>
                                                        <Icon name={'map-marker-alt'}
                                                              type={'FontAwesome5'}
                                                              style={styles.locationIcon}
                                                              color={'#ccc'}
                                                        />
                                                    </View>
                                                    <TouchableOpacity style={styles.addressBtn}
                                                                      onPress={() => this.openLocationOnMap({
                                                                          latitude: address.latitude,
                                                                          longitude: address.longitude,
                                                                      })}>
                                                        <Text style={styles.title} numberOfLines={1}>
                                                            {address.favorite_obj?.name}
                                                        </Text>
                                                        <Text style={styles.description} numberOfLines={1}>
                                                            {address.favorite_obj?.description}
                                                        </Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.addressLike}
                                                        onPress={() => this.removeSavedLocation(address.favorite_obj?.id)}>
                                                        <Image source={heart} style={styles.imageStyle}/>
                                                    </TouchableOpacity>
                                                </ListItem>
                                            })
                                        }
                                    </List>
                                }
                            </View>

                        }

                        {
                            false &&
                            <View style={styles.searchList}>
                                {
                                    <List style={styles.list}>
                                        <Separator bordered style={styles.separator}>
                                            <Text style={styles.separatorText}>Near By Location</Text>
                                        </Separator>
                                        {
                                            this.state.nearByLocations.map((address, index) => {
                                                return <ListItem key={index} style={styles.addressItem}>
                                                    <View style={styles.locationIconView}>
                                                        <Icon name={'map-marker'}
                                                              type={'FontAwesome5'}
                                                              style={styles.locationIcon}>
                                                        </Icon>
                                                    </View>
                                                    <TouchableOpacity style={styles.addressBtn}>
                                                        <Text style={styles.title} numberOfLines={1}>{address.name}</Text>
                                                        <Text style={styles.description}
                                                              numberOfLines={1}>{address.vicinity}</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={styles.addressLike}>
                                                        <Image source={heartO} style={styles.imageStyle}/>
                                                    </TouchableOpacity>
                                                </ListItem>
                                            })
                                        }
                                    </List>
                                }
                            </View>
                        }

                    </View>
                </Content>
            </Container>
        )
    }

}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        dispatch,
    }
};
const mapStateToProps = ({userReducer, mapConfig, locationReducer}) => {
    return {
        userReducer,
        mapConfig,
        locationReducer
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Location);


