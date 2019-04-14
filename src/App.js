import React, { Component } from 'react';
import './App.css';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { FilePicker } from 'react-file-picker';
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import TabContainerContent from "./TabContainerContent";
import {parseHotKey} from "./hotkeyParser"

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [{id: 0, title: "Human"}, {id: 1, title: "Orc"},{id: 2, title: "Undead"},{id: 3, title: "Night Elf"},{id: 4, title: "General"}],
            value: 0,
            file: null,//this.cache(),
            content: [],
            reader: null,
            loadText: "",
            loadPercent: ""
        };
        this.loadFile = this.loadFile.bind(this);
    }

    cache () {
        let rs = localStorage.getItem("file");
        return rs ? JSON.parse(rs) : null;
    }

    handleChange = (event, value) => {
        this.setState({ value: value });
    };

    setFile = (f) => {
        this.setState({ file: f });
        localStorage.setItem("file", JSON.stringify(f));
        this.parse(f);
    };

    loadFile (FileObject) {
        if(window.FileReader){
            let file = FileObject, reader = new FileReader(), self = this;

            reader.onload = function(r){
                self.setFile(r.target.result);

            };
            reader.readAsText(file);
            self.setState({reader:reader});
        }

    };

    parse = (x) => {
        let parsed = parseHotKey(x);
        this.setState({content: parsed});
    };

    tabContent = (id) => (
        <TabContainerContent
            title   = {id.title}
            content = {this.state.content}
        />
    );

    componentDidMount() {
       // if(this.state.file && this.state.content.length === 0) this.parse(this.state.file);
    }

    render() {

        const { value } = this.state;

        const MyComponent = () => (
            <div>
                <Typography>
                    Select your hotkey file.
                </Typography>
                <FilePicker
                    extensions  = {['txt']}
                    onChange    = {FileObject => this.loadFile(FileObject)}
                    onError     = {errMsg => alert(errMsg)}
                >
                    <Fab size="medium" color="secondary" aria-label="Add" >
                        <AddIcon />
                    </Fab>
                </FilePicker>
                {this.state.reader ? this.state.reader.LOADING ? "Loading" : "Not loading" : null}
            </div>
        );

        const UI = (
            <div>
                <AppBar position="static" color="default">

                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="on"
                        indicatorColor="primary"
                        textColor="primary"
                    >

                        {this.state.tabs.map((v, k) =>
                            <Tab
                                key={k}
                                label={v.title}
                                value={v.id}
                            />
                        )}


                    </Tabs>
                </AppBar>


                {this.state.tabs.map(t =>
                    value === t.id && <TabContainer key={t.id}>{this.tabContent(t)}</TabContainer>
                )}
            </div>
        );

        return (
            <div className="App">
                {this.state.file ?
                    UI :
                    <MyComponent />
                }
            </div>
        );
    }
}

export default App;
