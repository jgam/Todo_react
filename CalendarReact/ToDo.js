import React, {Component} from "react";
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput} from "react-native"

const{width, height} = Dimensions.get("window")

export default class ToDo extends React.Component{
		state = {
			isEditing: false,
			isCompleted: false,
			toDoValue: ""
		}
	render(){
		const{isCompleted, isEditing, toDoValue} = this.state;
		const {text} = this.props;
		return(
			<View style={styles.container}>
				<View style={styles.column}>
					<TouchableOpacity onPress={this._toggleComplete}>
						<View 
							style={[
								styles.circle, 
								isCompleted ? styles.completedCircle : styles.uncompletedCircle
							]} 
						/>
					</TouchableOpacity>
						{isEditing ? (
							<TextInput 
								style={styles.input,
										 styles.text,
										 isCompleted ? styles.completedText : styles.uncompletedText} 
								value ={toDoValue} 
								multiline={true}
								onChangeText={this._controlInput}
								returnKeyType={"done"}
								onBlur={this._finishEditing}
							/>
						) : (
						<Text
								style={[
									styles.text,
									isCompleted ? styles.completedText : styles.uncompletedText
								]}
							>
							{text}
						</Text>)}
				</View>
					{isEditing ? (
						<View style={styles.actions}>
							<TouchableOpacity onPressOut={this._finishEditing}	>
								<View style={styles.actionContainer}>
									<Text style={styles.actionText}>✅</Text>
								</View>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.actions}>
							<TouchableOpacity onPressOut={this._startEditing}>
								<View style={styles.actionContainer}>
									<Text style={styles.actionText}>✏️</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity>
								<View style={styles.actionContainer}>
									<Text style={styles.actionText}>✖️</Text>
								</View>
							</TouchableOpacity>
						</View>
					)}
			</View>
		);
	}
	_toggleComplete = () =>{
		this.setState(prevState => {
			return{
				isCompleted: !prevState.isCompleted//opposite state to revious state when toggled(clicked)
			};
		});
	};
	_startEditing = () =>{
			const{text} = this.props;
		this.setState({
			isEditing: true,
			toDoValue: text
		});
	};
	_finishEditing= () =>{
		this.setState({
			isEditing: false
		});
	};
	_controlInput = (text) => {
		this.setState({
			toDoValue: text
		});
	};

}

const styles = StyleSheet.create({
	container: {
		width: width-50,
		borderBottomColor:"#bbb",
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	circle:{
		width:30,
		height:30,
		borderRadius:15,
		borderColor:"red",
		borderWidth: 3,
		marginRight: 20
	},
	completedCircle: {
		borderColor: "#bbb"
	},
	uncompletedCircle: {
		borderColor: "#F23657"
	},
	text: {
		fontWeight: "600",
		fontSize: 20,
		marginVertical: 20
	},
	completedText: {
		color: "#bbb",
		textDecorationLine: "line-through"
	},
	uncompletedText: {
		color: "#353839"
	},
	column: {
		flexDirection: "row",
		alignItems:"center",
		width: width / 2,
		justifyContent: "space-between"
	},
	actions: {
		flexDirection: "row",
	},
	actionsContainer: {
		marginVertical: 10,
		marginHorizontal: 10//the margins to allow fat fingers to press the button
	},
	input: {
		marginVertical:15,
		width: width / 2
	}
})
