/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/* global styled */

import React from "react";
import Popup from "reactjs-popup";

handleMale = (e) => {
    this.props.store.userStore.setGender(0)
    this.props.store.userStore.handleSubmit()
}

handleFemale = (e) => {
    this.props.store.userStore.setGender(1)
    this.props.store.userStore.handleSubmit()
}

export default () => (
    <Popup trigger={<button>Select gender</button>} modal>
        <ModalContent>
            <input type="checkbox" name="male" value="0" onclick={handleMale}/>Male<br/>
            <input type="checkbox" name="female" value="1" onclick={handleFemale}/>Female<br/>
        </ModalContent>
    </Popup>
);

const ModalContent = styled.div`
    width: 100%;
    padding: 10px 5px;
`;

