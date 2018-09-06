/**
 * ServiceAvailabilityReply.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.fedex.ws.packagemovementinformationservice.v5;


/**
 * The descriptive data returned for a FedEx service availability
 * request.
 */
public class ServiceAvailabilityReply  implements java.io.Serializable {
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

    /* The descriptive data for the collection of available FedEx
     * Services returned for the request. */
    private com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityOption[] options;

    public ServiceAvailabilityReply() {
    }

    public ServiceAvailabilityReply(
           com.fedex.ws.packagemovementinformationservice.v5.NotificationSeverityType highestSeverity,
           com.fedex.ws.packagemovementinformationservice.v5.Notification[] notifications,
           com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail transactionDetail,
           com.fedex.ws.packagemovementinformationservice.v5.VersionId version,
           com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityOption[] options) {
           this.highestSeverity = highestSeverity;
           this.notifications = notifications;
           this.transactionDetail = transactionDetail;
           this.version = version;
           this.options = options;
    }


    /**
     * Gets the highestSeverity value for this ServiceAvailabilityReply.
     * 
     * @return highestSeverity   * Identifies the highest severity encountered when executing
     * the request; in order from high to low: FAILURE, ERROR, WARNING, NOTE,
     * SUCCESS.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.NotificationSeverityType getHighestSeverity() {
        return highestSeverity;
    }


    /**
     * Sets the highestSeverity value for this ServiceAvailabilityReply.
     * 
     * @param highestSeverity   * Identifies the highest severity encountered when executing
     * the request; in order from high to low: FAILURE, ERROR, WARNING, NOTE,
     * SUCCESS.
     */
    public void setHighestSeverity(com.fedex.ws.packagemovementinformationservice.v5.NotificationSeverityType highestSeverity) {
        this.highestSeverity = highestSeverity;
    }


    /**
     * Gets the notifications value for this ServiceAvailabilityReply.
     * 
     * @return notifications   * The descriptive data detailing the status of a sumbitted transaction.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.Notification[] getNotifications() {
        return notifications;
    }


    /**
     * Sets the notifications value for this ServiceAvailabilityReply.
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
     * Gets the transactionDetail value for this ServiceAvailabilityReply.
     * 
     * @return transactionDetail   * Descriptive data that governs data payload language/translations.
     * The TransactionDetail from the request is echoed back to the caller
     * in the corresponding reply.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail getTransactionDetail() {
        return transactionDetail;
    }


    /**
     * Sets the transactionDetail value for this ServiceAvailabilityReply.
     * 
     * @param transactionDetail   * Descriptive data that governs data payload language/translations.
     * The TransactionDetail from the request is echoed back to the caller
     * in the corresponding reply.
     */
    public void setTransactionDetail(com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail transactionDetail) {
        this.transactionDetail = transactionDetail;
    }


    /**
     * Gets the version value for this ServiceAvailabilityReply.
     * 
     * @return version   * Identifies the version/level of a service operation expected
     * by a caller (in each request) and performed by the callee (in each
     * reply).
     */
    public com.fedex.ws.packagemovementinformationservice.v5.VersionId getVersion() {
        return version;
    }


    /**
     * Sets the version value for this ServiceAvailabilityReply.
     * 
     * @param version   * Identifies the version/level of a service operation expected
     * by a caller (in each request) and performed by the callee (in each
     * reply).
     */
    public void setVersion(com.fedex.ws.packagemovementinformationservice.v5.VersionId version) {
        this.version = version;
    }


    /**
     * Gets the options value for this ServiceAvailabilityReply.
     * 
     * @return options   * The descriptive data for the collection of available FedEx
     * Services returned for the request.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityOption[] getOptions() {
        return options;
    }


    /**
     * Sets the options value for this ServiceAvailabilityReply.
     * 
     * @param options   * The descriptive data for the collection of available FedEx
     * Services returned for the request.
     */
    public void setOptions(com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityOption[] options) {
        this.options = options;
    }

    public com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityOption getOptions(int i) {
        return this.options[i];
    }

    public void setOptions(int i, com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityOption _value) {
        this.options[i] = _value;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ServiceAvailabilityReply)) return false;
        ServiceAvailabilityReply other = (ServiceAvailabilityReply) obj;
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
            ((this.options==null && other.getOptions()==null) || 
             (this.options!=null &&
              java.util.Arrays.equals(this.options, other.getOptions())));
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
        if (getOptions() != null) {
            for (int i=0;
                 i<java.lang.reflect.Array.getLength(getOptions());
                 i++) {
                java.lang.Object obj = java.lang.reflect.Array.get(getOptions(), i);
                if (obj != null &&
                    !obj.getClass().isArray()) {
                    _hashCode += obj.hashCode();
                }
            }
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ServiceAvailabilityReply.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityReply"));
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
        elemField.setFieldName("options");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Options"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityOption"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        elemField.setMaxOccursUnbounded(true);
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
