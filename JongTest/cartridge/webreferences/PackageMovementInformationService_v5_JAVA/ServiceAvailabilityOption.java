/**
 * ServiceAvailabilityOption.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.fedex.ws.packagemovementinformationservice.v5;


/**
 * The descriptive data which identifies an available FedEx Service.
 */
public class ServiceAvailabilityOption  implements java.io.Serializable {
    /* Identifies a FedEx Service that is available between the origin
     * and destination provided in the request. */
    private com.fedex.ws.packagemovementinformationservice.v5.ServiceType service;

    /* Identifies the delivery date of the available service. */
    private java.util.Date deliveryDate;

    /* Identifies the delivery day of week of the available service.
     * See DayOfWeekType for valid values. */
    private com.fedex.ws.packagemovementinformationservice.v5.DayOfWeekType deliveryDay;

    /* Identifies the FedEx location identifier of the package destination. */
    private java.lang.String destinationStationId;

    /* Identification of an airport, using standard three-letter abbreviations. */
    private java.lang.String destinationAirportId;

    public ServiceAvailabilityOption() {
    }

    public ServiceAvailabilityOption(
           com.fedex.ws.packagemovementinformationservice.v5.ServiceType service,
           java.util.Date deliveryDate,
           com.fedex.ws.packagemovementinformationservice.v5.DayOfWeekType deliveryDay,
           java.lang.String destinationStationId,
           java.lang.String destinationAirportId) {
           this.service = service;
           this.deliveryDate = deliveryDate;
           this.deliveryDay = deliveryDay;
           this.destinationStationId = destinationStationId;
           this.destinationAirportId = destinationAirportId;
    }


    /**
     * Gets the service value for this ServiceAvailabilityOption.
     * 
     * @return service   * Identifies a FedEx Service that is available between the origin
     * and destination provided in the request.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.ServiceType getService() {
        return service;
    }


    /**
     * Sets the service value for this ServiceAvailabilityOption.
     * 
     * @param service   * Identifies a FedEx Service that is available between the origin
     * and destination provided in the request.
     */
    public void setService(com.fedex.ws.packagemovementinformationservice.v5.ServiceType service) {
        this.service = service;
    }


    /**
     * Gets the deliveryDate value for this ServiceAvailabilityOption.
     * 
     * @return deliveryDate   * Identifies the delivery date of the available service.
     */
    public java.util.Date getDeliveryDate() {
        return deliveryDate;
    }


    /**
     * Sets the deliveryDate value for this ServiceAvailabilityOption.
     * 
     * @param deliveryDate   * Identifies the delivery date of the available service.
     */
    public void setDeliveryDate(java.util.Date deliveryDate) {
        this.deliveryDate = deliveryDate;
    }


    /**
     * Gets the deliveryDay value for this ServiceAvailabilityOption.
     * 
     * @return deliveryDay   * Identifies the delivery day of week of the available service.
     * See DayOfWeekType for valid values.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.DayOfWeekType getDeliveryDay() {
        return deliveryDay;
    }


    /**
     * Sets the deliveryDay value for this ServiceAvailabilityOption.
     * 
     * @param deliveryDay   * Identifies the delivery day of week of the available service.
     * See DayOfWeekType for valid values.
     */
    public void setDeliveryDay(com.fedex.ws.packagemovementinformationservice.v5.DayOfWeekType deliveryDay) {
        this.deliveryDay = deliveryDay;
    }


    /**
     * Gets the destinationStationId value for this ServiceAvailabilityOption.
     * 
     * @return destinationStationId   * Identifies the FedEx location identifier of the package destination.
     */
    public java.lang.String getDestinationStationId() {
        return destinationStationId;
    }


    /**
     * Sets the destinationStationId value for this ServiceAvailabilityOption.
     * 
     * @param destinationStationId   * Identifies the FedEx location identifier of the package destination.
     */
    public void setDestinationStationId(java.lang.String destinationStationId) {
        this.destinationStationId = destinationStationId;
    }


    /**
     * Gets the destinationAirportId value for this ServiceAvailabilityOption.
     * 
     * @return destinationAirportId   * Identification of an airport, using standard three-letter abbreviations.
     */
    public java.lang.String getDestinationAirportId() {
        return destinationAirportId;
    }


    /**
     * Sets the destinationAirportId value for this ServiceAvailabilityOption.
     * 
     * @param destinationAirportId   * Identification of an airport, using standard three-letter abbreviations.
     */
    public void setDestinationAirportId(java.lang.String destinationAirportId) {
        this.destinationAirportId = destinationAirportId;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ServiceAvailabilityOption)) return false;
        ServiceAvailabilityOption other = (ServiceAvailabilityOption) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.service==null && other.getService()==null) || 
             (this.service!=null &&
              this.service.equals(other.getService()))) &&
            ((this.deliveryDate==null && other.getDeliveryDate()==null) || 
             (this.deliveryDate!=null &&
              this.deliveryDate.equals(other.getDeliveryDate()))) &&
            ((this.deliveryDay==null && other.getDeliveryDay()==null) || 
             (this.deliveryDay!=null &&
              this.deliveryDay.equals(other.getDeliveryDay()))) &&
            ((this.destinationStationId==null && other.getDestinationStationId()==null) || 
             (this.destinationStationId!=null &&
              this.destinationStationId.equals(other.getDestinationStationId()))) &&
            ((this.destinationAirportId==null && other.getDestinationAirportId()==null) || 
             (this.destinationAirportId!=null &&
              this.destinationAirportId.equals(other.getDestinationAirportId())));
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
        if (getService() != null) {
            _hashCode += getService().hashCode();
        }
        if (getDeliveryDate() != null) {
            _hashCode += getDeliveryDate().hashCode();
        }
        if (getDeliveryDay() != null) {
            _hashCode += getDeliveryDay().hashCode();
        }
        if (getDestinationStationId() != null) {
            _hashCode += getDestinationStationId().hashCode();
        }
        if (getDestinationAirportId() != null) {
            _hashCode += getDestinationAirportId().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ServiceAvailabilityOption.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityOption"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("service");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Service"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceType"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("deliveryDate");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "DeliveryDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "date"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("deliveryDay");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "DeliveryDay"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "DayOfWeekType"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("destinationStationId");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "DestinationStationId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("destinationAirportId");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "DestinationAirportId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
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
