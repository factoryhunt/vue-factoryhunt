<template>
  <div class="page-container">

    <h2>{{title}}</h2>
    <hr>

    <div class="each-container">
      <h4>{{subTitle.terms}}</h4>
      <br>
      <p>The following are Terms and Conditions (“Terms”) of the Agreement between you and factoryhunt.com (hereinafter "Factory Hunt").
        You agree to be bound by these Terms and to comply with all applicable laws and regulations by using this website (“Site”).
        If you do not agree to these terms, do not use this Site.

        On purchasing any Goods, Products or Services from Factory Hunt by using this Site on via the phone or email, your purchases are governed by the applicable Terms contained in this page.

        Access to this Site is limited to viewing the web pages solely for legitimate business purposes to access the information provided by factoryhunt.com on this Site and not for any other purpose including copying, scraping, or violating any laws and regulations.
        Factory Hunt reserves the right, at its sole discretion, to revise these Terms and will publish all updates on this site.</p>
    </div>

    <div class="each-container">
      <h4>{{subTitle.copyright}}</h4>
      <br>
      <p>Factory Hunt makes no representation that the information contained on, distributed through, or linked, downloaded or accessed from any of the services contained in this Site is accurate, appropriate or available for use at all times. The Information on the Site may include product details, descriptions, specifications, images, reviews, prices and any other information displayed on the Site or any communication from the Site. Factory Hunt accepts no responsibility for any errors or omissions. All information in this Site is provided "as is" with no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of the information contained in this Site, and without warranty of any kind, express or implied, including, but not limited to warranties of performance, merchantability and fitness for a particular purpose.

        All the Titles, Ownership and Intellectual Property Rights in the Site and its Information shall remain with Factory Hunt or the original owner of the Information. All the rights not otherwise claimed under this agreement or by Factory Hunt are hereby reserved. The information on the Site may also be compiled or developed from publicly aired and published sources, by Third Parties or linked to other websites not maintained by Factory Hunt. These other Third Parties or linked websites are not subject to the same Privacy and other Policies and Factory Hunt is not responsible for the content of these Third Parties of other Sites. These Third Parties and websites may or may not be the original owners of the copyrights of the content they have provided to Factory Hunt from publicly available sources of information. Factory Hunt does not endorse or recommend any Third Party or website and disclaims any liability for the information provided by the Third Parties or other websites. The information contained in this Site is intended, solely to provide general information for use by the user, who accepts full responsibility of its use.

        Except as stated herein, none of the material may be copied, reproduced, distributed, republished, downloaded, displayed, posted or transmitted in any form or by any means, including, but not limited to any form of copying, scraping, mirroring in electronic, mechanical, photocopying etc. without the prior written permission of Factory Hunt or the copyright owner.

        The users should assume that standard copyright protection applies to all materials and contents displayed on the Site. Factory Hunt at its sole discretion may at any time revise or modify the information contained in this Site. </p>
    </div>

    <div class="each-container">
      <h4>{{subTitle.privacy}}</h4>
      <br>
      <p>Factory Hunt is committed to safeguard your privacy and information you will be providing when visiting the Site. We may collect, compile and utilize various types of information from parties accessing or visiting this Site including personal and non-personal information, transactional information and other relevant information that may be required to provide subsequent products or services to our customers through the forms filled by you as well as Cookies. Factory Hunt will never sell your information to any Third Party but may share your information for legitimate or legal business requirement to specific Third Parties like suppliers, financial institution etc.

        Factory Hunt may use the information collected to notify Site visitors of changes to this Site, to notify Site visitors of new products, and for any other legitimate and lawful purpose.
      </p>
    </div>

    <div class="each-container">
      <h4>{{subTitle.information}}</h4>
      <br>
      <p>All reviews, comments, remarks, graphics, designs or any other information submitted to Factory Hunt through this Site will forever be the property of Factory Hunt and Factory Hunt shall have exclusive ownership rights without any liability of compensation to any person or party. Unless otherwise specified in writing, all material submitted to factoryhunt.com will be presumed to be public and will not be treated as confidential.</p>
    </div>

    <div class="each-container">
      <h4>{{subTitle.trademarks}}</h4>
      <br>
      <p>Access to this Site does not constitute a right to copy or use any of the intellectual property of Factory Hunt or its suppliers. The trademarks, and logos used and displayed on this Site are registered and unregistered Trademarks of Factory Hunt and other Third Parties. Nothing on this Site should be construed as granting, by implication or otherwise, any license or right to use any Trademark displayed on the Site, without the written permission of the Trademark owner.</p>
    </div>

    <div class="each-container">
      <h4>{{subTitle.warrant}}</h4>
      <br>
      <p>All information on this Site is subject to change without notice. All Information, content and material on this site is provided "as is" without any express or implied warranties of any kind. Factory Hunt disclaims all warranties including, but not limited to, warranties of the products, fitness for a particular use, non-infringement or other violation of rights. Factory Hunt does not make any representations or warranties regarding the validity, accuracy, reliability, or the use or the information or products on this site or any sites linked to this site. Factory Hunt does not represent or warrant that the site will be error-free, or any defects will be corrected, or the site or servers are free of viruses, spyware or any other harmful software or code. Under no circumstances shall Factory Hunt be liable for any damages, whether direct or indirect, incidental or consequential, including (without limitation), loss of data, profit, software or hardware damage arising out of the use, or inability to use, the site or the products, even if Factory Hunt has been advised of the possibility of such damages. In the event your use of the Site results in the need for servicing, repair or correction of equipment or data, you assume any costs or expense for such needs.</p>
    </div>

    <div class="each-container">
      <h4>{{subTitle.law}}</h4>
      <br>
      <p>These Terms and Conditions contained herein will be governed by Korean laws. Any dispute shall be subject to the jurisdiction of the courts of Seoul, Republic of Korea. All parties shall exercise their best efforts to resolve by negotiation any and all disputes, controversies or differences arising out of or relating to this Agreement. Any dispute not settled by the Parties shall be referred to an Arbitrator in Seoul who will be bound by the express terms of this Agreement and under the jurisdiction of the courts of Seoul.</p>
    </div>

    <div class="each-container">
      <h4>{{subTitle.questions}}</h4>
      <br>
      <p>Questions regarding Factory Hunt Company's Terms of Access should be directed to:
        info@factoryhunt.com</p>
    </div>

  </div>
</template>

<script>
  import NavBar from '../components/NavBar'
  import FooterBar from '../components/FooterBar'

  export default {
    metaInfo: {
      title: 'Terms & Conditions | Factory Hunt'
    },
    components: {
      NavBar,
      FooterBar
    },
    data () {
      return {
        title: 'Terms & Conditions',
        subTitle: {
          terms: 'TERMS AND CONDITIONS',
          copyright: 'SITE INFORMATION AND COPYRIGHT',
          privacy: 'PRIVACY POLICY',
          information: 'INFORMATION SUBMITTED TO THE SITE',
          trademarks: 'TRADEMARKS',
          warrant: 'WARRANT DISCLAIMER AND LIMITATION OF LIABILITY',
          law: 'GOVERNING LAW AND DISPUTE RESOLUTION',
          questions: 'QUESTIONS'
        }
      }
    },
    created () {
      window.scrollTo(0, 0)
    }
  }
</script>

<style scoped>
  .each-container {
    margin-bottom: 30px;
  }
</style>
