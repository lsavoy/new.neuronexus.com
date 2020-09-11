// Class definition

var KTFormControls = function () {
    // Private functions

    var myProfileValidation = function () {
        $("#frmMyProfile").validate({
            // define validation rules
            rules: {
                first_name: {
                    required: true,
                    letterswithbasicpunc: true
                },
                last_name: {
                    required: true,
                    letterswithbasicpunc: true
                },
                email: {
                    required: true,
                    email: true
                }, phone: {

                    number: true,
                    maxlength: 10,
                    minlength: 10
                },
                profile_image: {
                    accept: "image/jpeg, image/jpg, image/png, image/svg+xml"
                }

            },
            messages: {
                first_name: {
                    required: "Please enter your full name",
                    letterswithbasicpunc: "Please enter alphabets only"
                },
                last_name: {
                    required: "Please enter your full name",
                    letterswithbasicpunc: "Please enter alphabets only"
                },
                email: {
                    required: "Please enter your email",
                    email: "Please enter valid email"
                },
                phone: {
                    email: "Please enter valid Phone"
                },
                profile_image: {
                    email: "Please enter valid Image Type"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    var changePasswordValidation = function () {
        $("#changePasswordForm").validate({
            // define validation rules
            rules: {
                old_password: {
                    required: true,
                },
                password: {
                    required: true,
                    minlength: 6
                },
                password_confirm: {
                    required: true,
                    minlength: 6,
                    equalTo: "#password"
                }
            },
            messages: {
                old_password: {
                    required: "Please enter your old password",
                    minlength: "Password must be atleast 6 characters length"
                },
                password: {
                    required: "Please enter your new password",
                },
                password_confirm: {
                    required: "Make sure that you have entered the same password here.",
                    minlength: "Confirm password must be atleast 6 characters length",
                    equalTo: "Confirm password must match with password"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    var editSettingValidation = function () {
        // alert('hgfd');
        $("#EditSetting").validate({

            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "This field is required"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var addUserFrmValidation = function () {
        $("#frmAddUser").validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                username: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    number: true,
                    maxlength: 10,
                    minlength: 10
                },
                password: {
                    required: true,
                    minlength: 6
                }
            },
            messages: {
                first_name: {
                    required: "Please enter full name"
                },
                last_name: {
                    required: "Please enter full name"
                },
                username: {
                    required: "Please enter username"
                },
                email: {
                    required: "Please enter email address",
                    email: "Please enter valid email address",
                },
                phone: {
                    required: "Please enter phone number",
                    number: "Please enter valid phone number",
                    maxlength: "Please enter valid phone number",
                    minlength: "Please enter valid phone number"
                },
                password: {
                    required: "Please enter password",
                    minlength: "Password must be atleast 6 characters length"
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editUserFrmValidation = function () {
        $("#frmEditUser").validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                username: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    number: true,
                    maxlength: 10,
                    minlength: 10
                }
            },
            messages: {
                first_name: {
                    required: "Please enter full name"
                },
                last_name: {
                    required: "Please enter full name"
                },
                username: {
                    required: "Please enter username"
                },
                email: {
                    required: "Please enter email address",
                    email: "Please enter valid email address",
                },
                phone: {
                    required: "Please enter phone number",
                    number: "Please enter valid phone number",
                    maxlength: "Please enter valid phone number",
                    minlength: "Please enter valid phone number"
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var addAgentFrmValidation = function () {
        $("#frmAddAgent").validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },

                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    number: true,
                    maxlength: 10,
                    minlength: 10
                },
                password: {
                    required: true,
                    minlength: 6
                },
                profile_image: {

                    accept: "image/jpeg, image/jpg, image/png, image/svg+xml"
                }
            },
            messages: {
                first_name: {
                    required: "Please enter First name"
                },
                last_name: {
                    required: "Please enter Last name"
                },

                email: {
                    required: "Please enter email address",
                    email: "Please enter valid email address",
                },
                phone: {
                    required: "Please enter phone number",
                    number: "Please enter valid phone number",
                    maxlength: "Please enter valid phone number",
                    minlength: "Please enter valid phone number"
                },
                password: {
                    required: "Please enter password",
                    minlength: "Password must be atleast 6 characters length"
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }
    var editAgentFrmValidation = function () {
        $("#frmEditAgent").validate({
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },

                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true,
                    number: true,
                    maxlength: 10,
                    minlength: 10
                },

                profile_image: {

                    accept: "image/jpeg, image/jpg, image/png, image/svg+xml"
                }
            },
            messages: {
                first_name: {
                    required: "Please enter First name"
                },
                last_name: {
                    required: "Please enter Last name"
                },

                email: {
                    required: "Please enter email address",
                    email: "Please enter valid email address",
                },
                phone: {
                    required: "Please enter phone number",
                    number: "Please enter valid phone number",
                    maxlength: "Please enter valid phone number",
                    minlength: "Please enter valid phone number"
                },
                password: {
                    required: "Please enter password",
                    minlength: "Password must be atleast 6 characters length"
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var addCaseTypeValidation = function () {
        $("#frmCreateCaseType").validate({
            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter case type"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editCaseTypeValidation = function () {
        $("#frmEditCaseType").validate({
            // define validation rules
            rules: {
                title: {
                    required: true,
                    // letterswithbasicpunc: true
                }
            },
            messages: {
                title: {
                    required: "Please enter case type"
                }
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var addCaseValidation = function () {
        $("#frmCreateCase").validate({
            // define validation rules
            rules: {
                first_name: {
                    required: true
                },
                last_name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                office_phone: {
                    required: true,
                    number: true,
                    maxlength: 10,
                    minlength: 10
                },
                caseNumber: {
                    required: true
                },
                case_type_id: {
                    required: true
                },
                status: {
                    required: true
                },
            },
            messages: {
                first_name: {
                    required: "Please enter full name"
                },
                last_name: {
                    required: "Please enter full name"
                },
                email: {
                    required: "Please enter email address",
                    email: "Please enter valid email address",
                },
                phone: {
                    required: "Please enter phone number",
                    number: "Please enter valid phone number",
                    maxlength: "Please enter valid phone number",
                    minlength: "Please enter valid phone number"
                },
                caseNumber: {
                    required: "Please enter case number"
                },
                case_type_id: {
                    required: "Please choose case type"
                },
                caseNumber: {
                    required: "Please choose case status"
                },
            },
            //display error alert on form submit  
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },

            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var addProductFrmValidation = function () {
        $("#frmAddProduct").validate({
            rules: {
                name: {
                    required: true
                },
               
               
            },
            messages: {

                name: {
                    required: "This field is required."
                },
                
                

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editProductFrmValidation = function () {
        $("#frmEditProduct").validate({
            rules: {
                name: {
                    required: true
                },
            },
            messages: {

                name: {
                    required: "This field is required."
                },
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var propertyAddFormValidation = function () {
        $('#propertyAddfrm').validate({
            rules: {
                property_image: {
                    required: true,
                },
                property_type_id: {
                    required: true,
                },
                open_house_price: {
                    required: true,
                },
                initial_investment: {
                    required: true,
                },
                lot_size: {
                    required: true,
                    number: true,
                },
                hoa: {
                    required: true,
                },
                built_in: {
                    required: true,
                    number: true,
                },
                address: {
                    required: true,
                },
                property_amenmenty_id: {
                    required: true,
                },
            },
            messages: {

                property_image: {
                    required: 'Property Image Required',
                },
                property_type_id: {
                    required: 'Property Type Required',
                },
                open_house_price: {
                    required: 'Open House Price Required',
                },
                initial_investment: {
                    required: 'Initial Investment Required',
                },
                lot_size: {
                    required: 'Lot Size Required',
                    number: "Please enter valid Lot Size",
                },
                hoa: {
                    required: 'HOA Required',
                },
                built_in: {
                    required: 'Built In Required',
                    number: "Please enter valid Built In",
                },
                address: {
                    required: 'Address Required',
                },
                property_amenmenty_id: {
                    required: 'Property Amenmenty Required',
                },
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var propertyEditFormValidation = function () {
        $('#propertyEditfrm').validate({
            rules: {

                property_type_id: {
                    required: true,
                },
                open_house_price: {
                    required: true,
                },
                initial_investment: {
                    required: true,
                },
                lot_size: {
                    required: true,
                    number: true,
                },
                hoa: {
                    required: true,
                },
                built_in: {
                    required: true,
                    number: true,
                },
                address: {
                    required: true,
                },
                property_amenmenty_id: {
                    required: true,
                },
            },
            messages: {


                property_type_id: {
                    required: 'Property Type Required',
                },
                open_house_price: {
                    required: 'Open House Price Required',
                },
                initial_investment: {
                    required: 'Initial Investment Required',
                },
                lot_size: {
                    required: 'Lot Size Required',
                    number: "Please enter valid Lot Size",
                },
                hoa: {
                    required: 'HOA Required',
                },
                built_in: {
                    required: 'Built In Required',
                    number: "Please enter valid Built In",
                },
                address: {
                    required: 'Address Required',
                },
                property_amenmenty_id: {
                    required: 'Property Amenmenty Required',
                },
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var propertyTypeAddFormValidation = function () {
        $('#propertyTypeAddfrm').validate({
            rules: {
                name: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: 'Property Type Required.',
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var propertyTypeEditFormValidation = function () {
        $('#propertyTypeEditfrm').validate({
            rules: {
                name: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: 'Property Type Required.',
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var propertyAmenmentyAddFormValidation = function () {
        $('#propertyAmenmentyAddfrm').validate({
            rules: {
                name: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: 'Property Amenmenty Required.',
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }
    var propertyAmenmentyEditFormValidation = function () {
        $('#propertyAmenmentyEditfrm').validate({
            rules: {
                name: {
                    required: true,
                }
            },
            messages: {
                name: {
                    required: 'Property Amenmenty Required.',
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editmeet_the_teamFormValidation = function () {
        $('#editmeet_the_teamFrm').validate({
            rules: {
                title_h2: {
                    required: true,
                },
                title_h3: {
                    required: true,
                },
                content: {
                    ckrequired: true,
                }
            },
            messages: {

                title_h2: {
                    required: 'This field is Required.',
                },
                title_h3: {
                    required: 'This field is Required.',
                },
                content: {
                    ckrequired: 'This field is Required.',
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editaboutusFormValidation = function () {
        $('#editaboutusFrm').validate({
            rules: {
                title_h2: {
                    required: true,
                },
                title_h3: {
                    required: true,
                },
                content: {
                    ckrequired: true,
                }
            },
            messages: {

                title_h2: {
                    required: 'This field is Required.',
                },
                title_h3: {
                    required: 'This field is Required.',
                },
                content: {
                    ckrequired: 'This field is Required.',
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    var editcontactstaticValidation = function () {
        $('#editcontactstaticFrm').validate({
            rules: {
                title_h2: {
                    required: true,
                },
                title_h3: {
                    required: true,
                },
                content: {
                    ckrequired: true,
                }
            },
            messages: {

                title_h2: {
                    required: 'This field is Required.',
                },
                title_h3: {
                    required: 'This field is Required.',
                },
                content: {
                    ckrequired: 'This field is Required.',
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }



    var frmCreateLeadershipFormValidation = function () {
        $('#frmCreateLeadership').validate({
            rules: {
                name: {
                    required: true,
                },
                qualification: {
                    required: true,
                },
                designation: {
                    required: true,
                },
                description: {
                    required: true,
                },
                image: {
                    required: true,
                }
            },
            messages: {

                name: {
                    required: 'This field is Required.',
                },
                qualification: {
                    required: 'This field is Required.',
                },
                designation: {
                    required: 'This field is Required.',
                },
                description: {
                    required: 'This field is Required.',
                },
                image: {
                    required: 'This field is Required.',
                }
            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var frmEditLeadershipFormValidation = function () {
        $('#frmEditLeadership').validate({
            rules: {
                name: {
                    required: true,
                },
                qualification: {
                    required: true,
                },
                designation: {
                    required: true,
                },
                description: {
                    required: true,
                },

            },
            messages: {

                name: {
                    required: 'This field is Required.',
                },
                qualification: {
                    required: 'This field is Required.',
                },
                designation: {
                    required: 'This field is Required.',
                },
                description: {
                    required: 'This field is Required.',
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editstaticproductFormValidation = function () {
        $('#editstaticproductFrm').validate({
            rules: {
                title: {
                    required: true,
                },
                content: {
                    ckrequired: true,
                },


            },
            messages: {

                title: {
                    required: 'This field is Required.',
                },
                content: {
                    ckrequired: 'This field is Required.',
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    var frmEditbrain_initiative_tabFormValidation = function () {
        $('#frmEditbrain_initiative_tab').validate({
            rules: {
                title: {
                    required: true,
                },
                content: {
                    ckrequired: true,
                },


            },
            messages: {

                title: {
                    required: 'This field is Required.',
                },
                content: {
                    ckrequired: 'This field is Required.',
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var frmCreatebrain_initiative_tabFormValidation = function () {
        $('#frmCreatebrain_initiative_tab').validate({
            rules: {
                title: {
                    required: true,
                },
                content: {
                    ckrequired: true,
                },


            },
            messages: {

                title: {
                    required: 'This field is Required.',
                },
                content: {
                    ckrequired: 'This field is Required.',
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    var editbrain_initiativeFrmFormValidation = function () {
        $('#editbrain_initiativeFrm').validate({
            rules: {

                content: {
                    ckrequired: true,
                },


            },
            messages: {


                content: {
                    ckrequired: 'This field is Required.',
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    var frmEditscience_update_collaboration_tabFormValidation = function () {
        $('#frmEditscience_update_collaboration_tab').validate({
            rules: {
                title: {
                    required: true,
                },
                content: {
                    ckrequired: true,
                },


            },
            messages: {

                title: {
                    required: 'This field is Required.',
                },
                content: {
                    ckrequired: 'This field is Required.',
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var frmCreatescience_update_collaboration_tabFormValidation = function () {
        $('#frmCreatescience_update_collaboration_tab').validate({
            rules: {
                title: {
                    required: true,
                },
                content: {
                    ckrequired: true,
                },


            },
            messages: {

                title: {
                    required: 'This field is Required.',
                },
                content: {
                    ckrequired: 'This field is Required.',
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    var editscience_update_collaborationFrmFormValidation = function () {
        $('#editscience_update_collaborationFrm').validate({
            rules: {

                title: {
                    required: true,
                },

                content: {
                    ckrequired: true,
                },


            },
            messages: {

                title: {
                    required: 'This field is Required.',
                },

                ckrequired: {
                    required: 'This field is Required.',
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }



    var editcareersFrmFormValidation = function () {
        $('#editcareersFrm').validate({
            rules: {

                title: {
                    required: true,
                },

                content: {
                    ckrequired: true,
                },


            },
            messages: {

                title: {
                    required: 'This field is Required.',
                },

                content: {
                    ckrequired: 'This field is Required.',
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    //
    var addCategoryKnowledgeFrmValidation = function () {
        $("#frmAddCategoryKnowledge").validate({
            rules: {
                name: {
                    required: true
                },

            },
            messages: {
                name: {
                    required: "Please enter category name"
                }

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editCategoryKnowledgeFrmValidation = function () {
        $("#frmEditCategoryKnowledge").validate({
            rules: {
                name: {
                    required: true
                },


            },
            messages: {
                name: {
                    required: "Please enter category name"
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var addSubCategoryKnowledgeFrmValidation = function () {
        $("#frmAddSubCategoryKnowledge").validate({
            rules: {
                parent_id: {
                    required: true
                },
                name: {
                    required: true
                },


            },
            messages: {
                parent_id: {
                    required: "Please select a category"
                },
                name: {
                    required: "Please enter category name"
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var editSubCategoryKnowledgeFrmValidation = function () {
        $("#frmEditSubCategoryKnowledge").validate({
            rules: {
                parent_id: {
                    required: true
                },
                name: {
                    required: true
                },


            },
            messages: {
                parent_id: {
                    required: "Please select a category"
                },
                name: {
                    required: "Please enter category name"
                },

            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    //

    var frmAddScienceUpdateFrmValidation = function () {
        $("#frmAddScienceUpdate").validate({
            rules: {

                title: {
                    required: true
                },
                content: {
                    ckrequired: true
                },
                image: {
                    required: true
                },
                category_id: {
                    required: true
                },


            },
            messages: {

                title: {
                    required: "This field is required"
                },
                content: {
                    ckrequired: "This field is required"
                },
                image: {
                    required: "This field is required"
                },
                category_id: {
                    required: "This field is required"
                },


            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    var frmEditScienceUpdateFrmValidation = function () {
        $("#frmEditScienceUpdate").validate({
            rules: {
                title: {
                    required: true
                },
                content: {
                    ckrequired: true
                },

                category_id: {
                    required: true
                },


            },
            messages: {

                title: {
                    required: "This field is required"
                },
                content: {
                    ckrequired: "This field is required"
                },

                category_id: {
                    required: "This field is required"
                },


            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }



    var frmAddsupport_categoryValidation = function () {
        $("#frmAddsupport_category").validate({
            rules: {
                parent_id: {
                    required: true
                },
                title: {
                    required: true
                },
                content: {
                    ckrequired: true
                },




            },
            messages: {
                parent_id: {
                    required: "This field is required"
                },
                title: {
                    required: "This field is required"
                },
                content: {
                    ckrequired: "This field is required"
                },


            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }




    var frmEditsupport_categoryValidation = function () {
        $("#frmEditsupport_category").validate({
            rules: {
                parent_id: {
                    required: true
                },
                title: {
                    required: true
                },
                content: {
                    ckrequired: true
                },




            },
            messages: {
                parent_id: {
                    required: "This field is required"
                },
                title: {
                    required: "This field is required"
                },
                content: {
                    ckrequired: "This field is required"
                },


            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }


    var editsupport_staticFrmValidation = function () {
        $("#editsupport_staticFrm").validate({
            rules: {

                title: {
                    required: true
                },
                content: {
                    ckrequired: true
                },




            },
            messages: {

                title: {
                    required: "This field is required"
                },
                content: {
                    ckrequired: "This field is required"
                },


            },
            invalidHandler: function (event, validator) {
                KTUtil.scrollTop();
            },
            submitHandler: function (form) {
                form[0].submit();
            }
        });
    }

    var blankSpaceNotAllow = function () {
        $("input").on("keypress", function (e) {
            var startPos = e.currentTarget.selectionStart;
            if (e.which === 32 && startPos == 0)
                e.preventDefault();
        })
    }

    return {
        // public functions
        init: function () {
            myProfileValidation();
            editSettingValidation();
            changePasswordValidation();

            addUserFrmValidation();
            editUserFrmValidation();

            addCaseTypeValidation();
            editCaseTypeValidation();

            addCaseValidation();
            addAgentFrmValidation();
            editAgentFrmValidation();

            addProductFrmValidation();
            editProductFrmValidation();

            propertyAddFormValidation();
            propertyEditFormValidation();

            propertyTypeAddFormValidation();
            propertyTypeEditFormValidation();

            propertyAmenmentyAddFormValidation();
            propertyAmenmentyEditFormValidation();

            editmeet_the_teamFormValidation();

            frmCreateLeadershipFormValidation();
            frmEditLeadershipFormValidation();

            editstaticproductFormValidation();
            editaboutusFormValidation();

            frmEditbrain_initiative_tabFormValidation();
            frmCreatebrain_initiative_tabFormValidation();

            editbrain_initiativeFrmFormValidation();

            frmEditscience_update_collaboration_tabFormValidation();
            frmCreatescience_update_collaboration_tabFormValidation();

            editscience_update_collaborationFrmFormValidation();

            editcareersFrmFormValidation();
            editcontactstaticValidation();

            addCategoryKnowledgeFrmValidation();
            editCategoryKnowledgeFrmValidation();
            addSubCategoryKnowledgeFrmValidation();
            editSubCategoryKnowledgeFrmValidation();

            frmAddScienceUpdateFrmValidation();
            frmEditScienceUpdateFrmValidation();


            frmAddsupport_categoryValidation();
            frmEditsupport_categoryValidation();
            editsupport_staticFrmValidation();


        }
    };
}();

jQuery(document).ready(function () {
    KTFormControls.init();
});
jQuery.validator.addMethod('ckrequired', function (value, element, params) {
    var idname = jQuery(element).attr('id');
    var messageLength = jQuery.trim(CKEDITOR.instances[idname].getData());
    return !params || messageLength.length !== 0;
}, "Image field is required");