/**
 * PostalCodeInquiryReply.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.fedex.ws.packagemovementinformationservice.v5;


/**
 * FedEx Postal Code Inquiry reply.
 */
public class PostalCodeInquiryReply  implements java.io.Serializable {
    /* Identifies the highest severity encountered when executing
     * the request; in order from high to low: FAILURE, ERROR, WARNING, NOTE,
     * SUCCESS. */
    private com.fedex.ws.packagemovementinformationservice.v5.NotificationSeverityType highestSeverity;

    /* The descriptive data detailing the status of a sumbitted transaction. */
    private com.fedex.ws.packagemovementinformationservice.v5.Notification[] notifications;

    /* Descriptive data that governs data payload language/translations.
     * The TransactionDetail from the request is echoed back to the caller
     * in the corresponding reply. */
    private com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail transactionDetail;

    /* Identifies the version/level of a service operation expected
     * by a caller (in each request) and performed by the callee (in each
     * reply). */
    private com.fedex.ws.packagemovementinformationservice.v5.VersionId version;

    /* Flag identifying whether Express Freight Contractor Delivery
     * Area. */
    private java.lang.Boolean expressFreightContractorDeliveryArea;

    /* Postal code service area description for Express. */
    private com.fedex.ws.packagemovementinformationservice.v5.PostalCodeServiceAreaDescription expressDescription;

    /* Only service area field is currently provided for Express Freight. */
    private com.fedex.ws.packagemovementinformationservice.v5.PostalCodeServiceAreaDescription expressFreightDescription;

    public PostalCodeInquiryReply() {
    }

    public PostalCodeInquiryReply(
           com.fedex.ws.packagemovementinformationservice.v5.NotificationSeverityType highestSeverity,
           com.fedex.ws.packagemovementinformationservice.v5.Notification[] notifications,
           com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail transactionDetail,
           com.fedex.ws.packagemovementinformationservice.v5.VersionId version,
           java.lang.Boolean expressFreightContractorDeliveryArea,
           com.fedex.ws.packagemovementinformationservice.v5.PostalCodeServiceAreaDescription expressDescription,
           com.fedex.ws.packagemovementinformationservice.v5.PostalCodeServiceAreaDescription expressFreightDescription) {
           this.highestSeverity = highestSeverity;
           this.notifications = notifications;
           this.transactionDetail = transactionDetail;
           this.version = version;
           this.expressFreightContractorDeliveryArea = expressFreightContractorDeliveryArea;
           this.expressDescription = expressDescription;
           this.expressFreightDescription = expressFreightDescription;
    }


    /**
     * Gets the highestSeverity value for this PostalCodeInquiryReply.
     * 
     * @return highestSeverity   * Identifies the highest severity encountered when executing
     * the request; in order from high to low: FAILURE, ERROR, WARNING, NOTE,
     * SUCCESS.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.NotificationSeverityType getHighestSeverity() {
        return highestSeverity;
    }


    /**
     * Sets the highestSeverity value for this PostalCodeInquiryReply.
     * 
     * @param highestSeverity   * Identifies the highest severity encountered when executing
     * the request; in order from high to low: FAILURE, ERROR, WARNING, NOTE,
     * SUCCESS.
     */
    public void setHighestSeverity(com.fedex.ws.packagemovementinformationservice.v5.NotificationSeverityType highestSeverity) {
        this.highestSeverity = highestSeverity;
    }


    /**
     * Gets the notifications value for this PostalCodeInquiryReply.
     * 
     * @return notifications   * The descriptive data detailing the status of a sumbitted transaction.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.Notification[] getNotifications() {
        return notifications;
    }


    /**
     * Sets the notifications value for this PostalCodeInquiryReply.
     * 
     * @param notifications   * The descriptive data detailing the status of a sumbitted transaction.
     */
    public void setNotifications(com.fedex.ws.packagemovementinformationservice.v5.Notification[] notifications) {
        this.notifications = notifications;
    }

    public com.fedex.ws.packagemovementinformationservice.v5.Notification getNotifications(int i) {
        return this.notifications[i];
    }

    public void setNotifications(int i, com.fedex.ws.packagemovementinformationservice.v5.Notification _value) {
        this.notifications[i] = _value;
    }


    /**
     * Gets the transactionDetail value for this PostalCodeInquiryReply.
     * 
     * @return transactionDetail   * Descriptive data that governs data payload language/translations.
     * The TransactionDetail from the request is echoed back to the caller
     * in the corresponding reply.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail getTransactionDetail() {
        return transactionDetail;
    }


    /**
     * Sets the transactionDetail value for this PostalCodeInquiryReply.
     * 
     * @param transactionDetail   * Descriptive data that governs data payload language/translations.
     * The TransactionDetail from the request is echoed back to the caller
     * in the corresponding reply.
     */
    public void setTransactionDetail(com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail transactionDetail) {
        this.transactionDetail = transactionDetail;
    }


    /**
     * Gets the version value for this PostalCodeInquiryReply.
     * 
     * @return version   * Identifies the version/level of a service operation expected
     * by a caller (in each request) and performed by the callee (in each
     * reply).
     */
    public com.fedex.ws.packagemovementinformationservice.v5.VersionId getVersion() {
        return version;
    }


    /**
     * Sets the version value for this PostalCodeInquiryReply.
     * 
     * @param version   * Identifies the version/level of a service operation expected
     * by a caller (in each request) and performed by the callee (in each
     * reply).
     */
    public void setVersion(com.fedex.ws.packagemovementinformationservice.v5.VersionId version) {
        this.version = version;
    }


    /**
     * Gets the expressFreightContractorDeliveryArea value for this PostalCodeInquiryReply.
     * 
     * @return expressFreightContractorDeliveryArea   * Flag identifying whether Express Freight Contractor Delivery
     * Area.
     */
    public java.lang.Boolean getExpressFreightContractorDeliveryArea() {
        return expressFreightContractorDeliveryArea;
    }


    /**
     * Sets the expressFreightContractorDeliveryArea value for this PostalCodeInquiryReply.
     * 
     * @param expressFreightContractorDeliveryArea   * Flag identifying whether Express Freight Contractor Delivery
     * Area.
     */
    public void setExpressFreightContractorDeliveryArea(java.lang.Boolean expressFreightContractorDeliveryArea) {
        this.expressFreightContractorDeliveryArea = expressFreightContractorDeliveryArea;
    }


    /**
     * Gets the expressDescription value for this PostalCodeInquiryReply.
     * 
     * @return expressDescription   * Postal code service area description for Express.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.PostalCodeServiceAreaDescription getExpressDescription() {
        return expressDescription;
    }


    /**
     * Sets the expressDescription value for this PostalCodeInquiryReply.
     * 
     * @param expressDescription   * Postal code service area description for Express.
     */
    public void setExpressDescription(com.fedex.ws.packagemovementinformationservice.v5.PostalCodeServiceAreaDescription expressDescription) {
        this.expressDescription = expressDescription;
    }


    /**
     * Gets the expressFreightDescription value for this PostalCodeInquiryReply.
     * 
     * @return expressFreightDescription   * Only service area field is currently provided for Express Freight.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.PostalCodeServiceAreaDescription getExpressFreightDescription() {
        return expressFreightDescription;
    }


    /**
     * Sets the expressFreightDescription value for this PostalCodeInquiryReply.
     * 
     * @param expressFreightDescription   * Only service area field is currently provided for Express Freight.
     */
    public void setExpressFreightDescription(com.fedex.ws.packagemovementinformationservice.v5.PostalCodeServiceAreaDescription expressFreightDescription) {
        this.expressFreightDescription = expressFreightDescription;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof PostalCodeInquiryReply)) return false;
        PostalCodeInquiryReply other = (PostalCodeInquiryReply) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.highestSeverity==null && other.getHighestSeverity()==null) || 
             (this.highestSeverity!=null &&
              this.highestSeverity.equals(other.getHighestSeverity()))) &&
            ((this.notifications==null && other.getNotifications()==null) || 
             (this.notifications!=null &&
              java.util.Arrays.equals(this.notifications, other.getNotifications()))) &&
            ((this.transactionDetail==null && other.getTransactionDetail()==null) || 
             (this.transactionDetail!=null &&
              this.transactionDetail.equals(other.getTransactionDetail()))) &&
            ((this.version==null && other.getVersion()==null) || 
             (this.version!=null &&
              this.version.equals(other.getVersion()))) &&
            ((this.expressFreightContractorDeliveryArea==null && other.getExpressFreightContractorDeliveryArea()==null) || 
             (this.expressFreightContractorDeliveryArea!=null &&
              this.expressFreightContractorDeliveryArea.equals(other.getExpressFreightContractorDeliveryArea()))) &&
            ((this.expressDescription==null && other.getExpressDescription()==null) || 
             (this.expressDescription!=null &&
              this.expressDescription.equals(other.getExpressDescription()))) &&
            ((this.expressFreightDescription==null && other.getExpressFreightDescription()==null) || 
             (this.expressFreightDescription!=null &&
              this.expressFreightDescription.equals(other.getExpressFreightDescription())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getHighestSeverity() != null) {
            _hashCode += getHighestSeverity().hashCode();
        }
        if (getNotifications() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getNotifications());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getNotifications(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        if (getTransactionDetail() != null) {
            _hashCode += getTransactionDetail().hashCode();
        }
        if (getVersion() != null) {
            _hashCode += getVersion().hashCode();
        }
        if (getExpressFreightContractorDeliveryArea() != null) {
            _hashCode += getExpressFreightContractorDeliveryArea().hashCode();
        }
        if (getExpressDescription() != null) {
            _hashCode += getExpressDescription().hashCode();
        }
        if (getExpressFreightDescription() != null) {
            _hashCode += getExpressFreightDescription().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(PostalCodeInquiryReply.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeInquiryReply"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("highestSeverity");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "HighestSeverity"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "NotificationSeverityType"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("notifications");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Notifications"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Notification"));
        elemField.setNillable(false);
        elemField.setMaxOccursUnbounded(true);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("transactionDetail");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "TransactionDetail"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "TransactionDetail"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("version");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Version"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "VersionId"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("expressFreightContractorDeliveryArea");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ExpressFreightContractorDeliveryArea"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "boolean"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("expressDescription");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ExpressDescription"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeServiceAreaDescription"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("expressFreightDescription");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ExpressFreightDescription"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeServiceAreaDescription"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
