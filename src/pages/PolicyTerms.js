import React, {Component} from 'react';
import styled from 'styled-components';
import back from '../assets/icons/back.svg';

export default class PolicyTerms extends Component {
    render() {
        return (
            <Container>
                {/*Place route to previous page here*/}
                <BackArea src={back}></BackArea>
                <Title id="name">Privacy Policy</Title>
                    <ChapterTitle>Introduction</ChapterTitle>
                    <ol type="1" className="list">
                      <ChapterListItem>We are committed to safeguarding the privacy of all visitors and users of our website.</ChapterListItem>
                      <ChapterListItem>This policy applies where we are acting as a data controller with respect to the personal data of our website visitors and service users; in other words, where we determine the purposes and means of the processing of that personal data.</ChapterListItem>
                      <ChapterListItem>In this policy, "we", "us" and "our" refer to Wooo management. For more information about us, see Section 13.</ChapterListItem>
                    </ol>
                    <ChapterTitle>Credit</ChapterTitle>
                    <ol type="1" className="list">
                      <ChapterListItem>This document was created using a template from SEQ Legal (<Url href="https://seqlegal.com/free-legal-documents/privacy-policy">https://seqlegal.com/free-legal-documents/privacy-policy</Url>).</ChapterListItem>
                    </ol>
                <ChapterTitle>How we use your personal data</ChapterTitle>
                <ol type="1" className="list">
                  <ChapterListItem>
                    In this Section 3 we have set out:
                    <ul className="list">
                      <ChapterListItem>the general categories of personal data that we may process;</ChapterListItem>
                      <ChapterListItem>in the case of personal data that we did not obtain directly from you, the source and specific categories of that data;</ChapterListItem>
                      <ChapterListItem>purposes for which we may process personal data; and</ChapterListItem>
                      <ChapterListItem>the legal bases of the processing.</ChapterListItem>
                    </ul>
                  </ChapterListItem>
                  <ChapterListItem>We may process your account data ("<strong>account data</strong>"). The account data may include your name and email address. The source of the account data is through your registration using Facebook. The account data may be processed for the purposes of operating our website, providing our services, ensuring the security of our website and services, maintaining back-ups of our databases and communicating with you. The legal basis for this processing is consent OR our legitimate interests, namely the proper administration of our website OR the performance of a contract between you and us and/or taking steps, at your request, to enter into such a contract.</ChapterListItem>
                  <ChapterListItem>We may process your information included in your personal profile on our website ("<strong>profile data</strong>"). The profile data may include your name, age, biography, sexual preferences, email address, profile pictures, gender, date of birth, preferred search radius, and sexual orientation. The profile data may be processed for the purposes of enabling and monitoring your use of our website and services. The legal basis for this processing is consent OR our legitimate interests, namely the proper administration of our website OR the performance of a contract between you and us and/or taking steps, at your request, to enter into such a contract.</ChapterListItem>
                  <ChapterListItem>We may process your personal data that are provided in the course of the use of our services ("<strong>service data</strong>"). The service data may include your geographical location, matches, likes, and most of your profile data. The source of the service data is Google Maps API, Facebook during registration, our matching service, and yourself during profile set-up. The service data may be processed for the purposes of operating our website, providing our services, ensuring the security of our website and services, maintaining back-ups of our databases and communicating with you. The legal basis for this processing is consent OR our legitimate interests, namely the proper administration of our website OR the performance of a contract between you and us and/or taking steps, at your request, to enter into such a contract.</ChapterListItem>
                  <ChapterListItem>We may process information that you post for publication on our website or through our services ("<strong>publication data</strong>"). The publication data may be processed for the purposes of enabling such publication and administering our website and services. The legal basis for this processing is consent OR our legitimate interests, namely the proper administration of our website OR the performance of a contract between you and us and/or taking steps, at your request, to enter into such a contract.</ChapterListItem>
                  <ChapterListItem>We may process information contained in any inquiry you submit to us regarding goods and/or services ("<strong>inquiry data</strong>"). The inquiry data may be processed for the purposes of offering, marketing and selling relevant goods and/or services to you. The legal basis for this processing is consent.</ChapterListItem>
                  <ChapterListItem>We may process any of your personal data identified in this policy where necessary for the establishment, exercise or defense of legal claims, whether in court proceedings or in an administrative or out-of-court procedure. The legal basis for this processing is our legitimate interests, namely the protection and assertion of our legal rights, your legal rights and the legal rights of others.</ChapterListItem>
                  <ChapterListItem>We may process any of your personal data identified in this policy where necessary for the purposes of obtaining or maintaining insurance coverage, managing risks, or obtaining professional advice. The legal basis for this processing is our legitimate interests, namely the proper protection of our application against risks.</ChapterListItem>
                  <ChapterListItem>In addition to the specific purposes for which we may process your personal data set out in this Section 3, we may also process any of your personal data where such processing is necessary for compliance with a legal obligation to which we are subject, or in order to protect your vital interests or the vital interests of another natural person.</ChapterListItem>
                  <ChapterListItem>Please do not supply any other person's personal data to us, unless we prompt you to do so.</ChapterListItem>
                </ol>

                <ChapterTitle>Providing your personal data to others</ChapterTitle>
                <ol type="1" className="list">
                  <ChapterListItem>We may disclose your profile data, specifically your name, profile pictures, biography, age, date of birth, and gender to other users of the matching service on our website for the purpose of fulfilling the objective of the matching service – to find a partner or a match.</ChapterListItem>
                  <ChapterListItem>In addition to the specific disclosures of personal data set out in this Section 4, we may disclose your personal data where such disclosure is necessary for compliance with a legal obligation to which we are subject, or in order to protect your vital interests or the vital interests of another natural person. We may also disclose your personal data where such disclosure is necessary for the establishment, exercise or defense of legal claims, whether in court proceedings or in an administrative or out-of-court procedure.</ChapterListItem>
                </ol>

                    <ChapterTitle>International transfers of your personal data</ChapterTitle>
                    <ol type="1" className="list">
                      <ChapterListItem>You acknowledge that personal data that you submit for publication through our website may be available, via the internet, around the world. We cannot prevent the use (or misuse) of such personal data by others.</ChapterListItem>
                    </ol>
                    <ChapterTitle>Retaining and deleting personal data</ChapterTitle>
                    <ol type="1" className="list">
                      <ChapterListItem>This Section 6 sets out our data retention policies and procedure, which are designed to help ensure that we comply with our legal obligations in relation to the retention and deletion of personal data.</ChapterListItem>
                      <ChapterListItem>Personal data that we process for any purpose or purposes shall not be kept for longer than is necessary for that purpose or those purposes.</ChapterListItem>
                      <ChapterListItem>
                        In some cases it is not possible for us to specify in advance the periods for which your personal data will be retained. In such cases, we will determine the period of retention based on the following criteria:
                        <ul className="list">
                          <ChapterListItem>The period of retention of account data, profile data, service data, publication data, and inquiry data will be determined based on the operation of our website and services.</ChapterListItem>
                          <ChapterListItem>Upon termination of our website and services, data will no longer be retained and will be deleted.</ChapterListItem>
                        </ul>
                      </ChapterListItem>
                      <ChapterListItem>Notwithstanding the other provisions of this Section 6, we may retain your personal data where such retention is necessary for compliance with a legal obligation to which we are subject, or in order to protect your vital interests or the vital interests of another natural person.</ChapterListItem>
                    </ol>
                    <ChapterTitle>Amendments</ChapterTitle>
                    <ol type="1" className="list">
                      <ChapterListItem>We may update this policy from time to time by publishing a new version on our website.</ChapterListItem>
                      <ChapterListItem>You should check this page occasionally to ensure you are happy with any changes to this policy.</ChapterListItem>
                      <ChapterListItem>will notify you of changes OR updates to this policy by email or through the notification and private messaging system on our website.</ChapterListItem>
                    </ol>
                    <ChapterTitle>Your rights</ChapterTitle>
                    <ol type="1" className="list">
                      <ChapterListItem>In this Section 8, we have summarised the rights that you have under data protection law. Some of the rights are complex, and not all of the details have been included in our summaries. Accordingly, you should read the relevant laws and guidance from the regulatory authorities for a full explanation of these rights.</ChapterListItem>
                      <ChapterListItem>
                        Your principal rights under data protection law are:
                        <ul className="list">
                          <ChapterListItem>the right to access;</ChapterListItem>
                          <ChapterListItem>the right to rectification;</ChapterListItem>
                          <ChapterListItem>the right to erasure;</ChapterListItem>
                          <ChapterListItem>the right to restrict processing;</ChapterListItem>
                          <ChapterListItem>the right to object to processing;</ChapterListItem>
                          <ChapterListItem>the right to data portability;</ChapterListItem>
                          <ChapterListItem>the right to complain to a supervisory authority; and</ChapterListItem>
                          <ChapterListItem>the right to withdraw consent.</ChapterListItem>
                        </ul>
                      </ChapterListItem>
                      <ChapterListItem>You have the right to confirmation as to whether or not we process your personal data and, where we do, access to the personal data, together with certain additional information. That additional information includes details of the purposes of the processing, the categories of personal data concerned and the recipients of the personal data. Providing the rights and freedoms of others are not affected, we will supply to you a copy of your personal data. The first copy will be provided free of charge, but additional copies may be subject to a reasonable fee.</ChapterListItem>
                      <ChapterListItem>You have the right to have any inaccurate personal data about you rectified and, taking into account the purposes of the processing, to have any incomplete personal data about you completed.</ChapterListItem>
                      <ChapterListItem>
                        In some circumstances you have the right to the erasure of your personal data without undue delay. Those circumstances include:
                        <ul className="list">
                          <ChapterListItem>the personal data are no longer necessary in relation to the purposes for which they were collected or otherwise processed;</ChapterListItem>
                          <ChapterListItem>you withdraw consent to consent-based processing;</ChapterListItem>
                          <ChapterListItem>you object to the processing under certain rules of applicable data protection law;</ChapterListItem>
                          <ChapterListItem>the processing is for direct marketing purposes; and</ChapterListItem>
                          <ChapterListItem>the personal data have been unlawfully processed.</ChapterListItem>
                        </ul>
                        However, there are exclusions of the right to erasure. The general exclusions include where processing is necessary: for exercising the right of freedom of expression and information; for compliance with a legal obligation; or for the establishment, exercise or defense of legal claims.
                      </ChapterListItem>
                      <ChapterListItem>
                        In some circumstances you have the right to restrict the processing of your personal data. Those circumstances are:
                        <ul className="list">
                          <ChapterListItem>you contest the accuracy of the personal data;</ChapterListItem>
                          <ChapterListItem>processing is unlawful but you oppose erasure;</ChapterListItem>
                          <ChapterListItem>we no longer need the personal data for the purposes of our processing, but you require personal data for the establishment, exercise or defense of legal claims; and</ChapterListItem>
                          <ChapterListItem>you have objected to processing, pending the verification of that objection.</ChapterListItem>
                        </ul>
                        Where processing has been restricted on this basis, we may continue to store your personal data. However, we will only otherwise process it: with your consent; for the establishment, exercise or defense of legal claims; for the protection of the rights of another natural or legal person; or for reasons of important public interest.
                      </ChapterListItem>
                      <ChapterListItem>You have the right to object to our processing of your personal data on grounds relating to your particular situation, but only to the extent that the legal basis for the processing is that the processing is necessary for: the performance of a task carried out in the public interest or in the exercise of any official authority vested in us; or the purposes of the legitimate interests pursued by us or by a third party. If you make such an objection, we will cease to process the personal information unless we can demonstrate compelling legitimate grounds for the processing which override your interests, rights and freedoms, or the processing is for the establishment, exercise or defense of legal claims.</ChapterListItem>
                      <ChapterListItem>You have the right to object to our processing of your personal data for direct marketing purposes (including profiling for direct marketing purposes). If you make such an objection, we will cease to process your personal data for this purpose.</ChapterListItem>
                      <ChapterListItem>You have the right to object to our processing of your personal data for scientific or historical research purposes or statistical purposes on grounds relating to your particular situation, unless the processing is necessary for the performance of a task carried out for reasons of public interest.</ChapterListItem>
                      <ChapterListItem>
                        To the extent that the legal basis for our processing of your personal data is:
                        <ul className="list">
                          <ChapterListItem>consent; or</ChapterListItem>
                          <ChapterListItem>that the processing is necessary for the performance of a contract to which you are party or in order to take steps at your request prior to entering into a contract,</ChapterListItem>
                        </ul>
                        and such processing is carried out by automated means, you have the right to receive your personal data from us in a structured, commonly used and machine-readable format. However, this right does not apply where it would adversely affect the rights and freedoms of others.
                      </ChapterListItem>
                      <ChapterListItem>If you consider that our processing of your personal information infringes data protection laws, you have a legal right to lodge a complaint with a supervisory authority responsible for data protection. You may do so in your habitual residence, your place of work or the place of the alleged infringement.</ChapterListItem>
                      <ChapterListItem>To the extent that the legal basis for our processing of your personal information is consent, you have the right to withdraw that consent at any time. Withdrawal will not affect the lawfulness of processing before the withdrawal.</ChapterListItem>
                      <ChapterListItem>You may exercise any of your rights in relation to your personal data by written notice to us OR by contacting us through telephone and/or email, as published on our website.</ChapterListItem>
                    </ol>
                    <ChapterTitle>Our details</ChapterTitle>
                    <ol type="1" className="list">
                      <ChapterListItem>This website is owned and operated by Wooo.</ChapterListItem>
                      <ChapterListItem>We are a group of students from the University of San Carlos located in Cebu, Philippines.</ChapterListItem>
                      <ChapterListItem>Our principal place of business is at Nasipit, Talamban, Cebu City, 6000 Cebu, Philippines.</ChapterListItem>
                      <ChapterListItem>
                        You can contact us:
                        <ul className="list">
                          <ChapterListItem>by post, to the postal address given above;</ChapterListItem>
                          <ChapterListItem>by telephone, on the contact number published on our website from time to time; or</ChapterListItem>
                          <ChapterListItem>by email, using the email address published on our website from time to time.</ChapterListItem>
                        </ul>
                      </ChapterListItem>
                    </ol>
            </Container>
        );
    }
}


const Container = styled.div`
    display: flex;
    flex-basis: min-content;
    flex-direction: column;
    justify-content: center;
    background-color: black;
    color: white;
    padding: 2.6vh;
`;

const Title = styled.span`
    font-size: 5vh;
    font-weight: 600;
    text-align: center;
    margin: 4vh;
`;

const ChapterTitle = styled.span`
    font-size: 4vh;
    font-weight: 500;
`;

const ChapterListItem = styled.li`
    font-size: 3vh;
    font-weight: 300;
    margin-top: 2vh;
    margin-bottom: 2vh;
`;

const Url = styled.a`
    color: #6393f9;
`;

const BackArea = styled.img`
    height: 7vh;
    width: 7vh;
    background-color: black;
    border-width: 0;
    cursor: pointer;
`;



