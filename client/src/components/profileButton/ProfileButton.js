import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useContext, useRef, useState } from "react";
import { AuthContext } from '../../context/AuthContext';
import "./ProfileButton.module.css";
import Image from '../image/Image';
import PropTypes from "prop-types";
import DropdownMenu from '../dropdown/DropdownMenu';

const ProfileButton = (props) => {
    const { className, src, alt, hasDropdown, direction, dropdownRef, isMenuOpen, setMenuOpen } = props;

    const userContext = useContext(AuthContext);
    const toggle = () => setMenuOpen(!isMenuOpen);

    if (!src || !alt) {
        throw new Error("You need to pass src and alt props to Image component.");
    };

    return (
        <>
            <div ref={dropdownRef} onClick={toggle}>
                <Image 
                    className={className}
                    src={src}
                    alt={alt}
                />
            </div>
            {/* {isMenuOpen && hasDropdown && (
                <DropdownMenu isMenuOpen={isMenuOpen} direction={direction} />
            )} */}
        </>
    );
};

const { string, bool } = PropTypes;

ProfileButton.defaultProps = {
    className: null,
    src: null,
    alt: null,
    hasDropdown: false
};

ProfileButton.propTypes = {
    className: string,
    src: string.isRequired,
    alt: string.isRequired,
    hasDropdown: bool
};

export default ProfileButton;