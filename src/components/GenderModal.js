import React, { Component } from "react";
import Popup from "reactjs-popup";
import styled, {css} from "styled-components"

export default class GenderModal extends Component {

    handleMale = (e) => {
        this.props.store.userStore.setGender(0)
        this.props.store.userStore.handleSubmit()
    }

    handleFemale = (e) => {
        this.props.store.userStore.setGender(1)
        this.props.store.userStore.handleSubmit()
    }

    render() {
        return(
            <Popup trigger={<button>Select gender</button>} modal>
                <ModalContent>
                    <input type="checkbox" name="male" value="0" onclick={this.handleMale}/>Male<br/>
                    <input type="checkbox" name="female" value="1" onclick={this.handleFemale}/>Female<br/>
                </ModalContent>
            </Popup>
        )
    }
};

const ModalContent = styled.div`
    width: 100%;
    padding: 10px 5px;
`;

