/**
 * ServiceAvailabilityRequest.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.fedex.ws.packagemovementinformationservice.v5;


/**
 * The descriptive data which is used to determine which FedEx Express
 * services are available between an origin and destination. To check
 * the availability of one particular FedEx Express service and packaging
 * type, include the Service and Packaging elements in the request message.
 * Only information regarding that single service and packaging type
 * will be returned from the request. To obtain a list of all available
 * services for a given origin and destination, omit the Service and
 * Packaging elements from the request. In this case the reply will contain
 * every available service.
 */
public class ServiceAvailabilityRequest  implements java.io.Serializable {
    /* Descriptive data to be used in authentication of the sender's
     * identity (and right to use FedEx web services). */
    private com.fedex.ws.packagemovementinformationservice.v5.WebAuthenticationDetail webAuthenticationDetail;

    /* The descriptive data identifying the client submitting the
     * transaction. */
    private com.fedex.ws.packagemovementinformationservice.v5.ClientDetail clientDetail;

    /* The descriptive data for this customer transaction. The TransactionDetail
     * from the request is echoed back to the caller in the corresponding
     * reply. */
    private com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail transactionDetail;

    /* Identifies the version/level of a service operation expected
     * by a caller (in each request) and performed by the callee (in each
     * reply). */
    private com.fedex.ws.packagemovementinformationservice.v5.VersionId version;

    /* The descriptive data for the physical location from which the
     * shipment originates. */
    private com.fedex.ws.packagemovementinformationservice.v5.Address origin;

    /* The descriptive data for the physical location to which the
     * shipment is destined. */
    private com.fedex.ws.packagemovementinformationservice.v5.Address destination;

    /* The date on which the package will be shipped. The date should
     * not  be a past date or a date more than 10 days in the future. The
     * date format must be YYYY-MM-DD. */
    private java.util.Date shipDate;

    /* Optionally supplied instead of service to restrict reply to
     * services for a specific carrier. */
    private com.fedex.ws.packagemovementinformationservice.v5.CarrierCodeType carrierCode;

    /* Restricts reply to single service, if supplied. */
    private com.fedex.ws.packagemovementinformationservice.v5.ServiceType service;

    /* Identifies the FedEx packaging type used by the requestor for
     * the package. See PackagingType for valid values. Omit this element
     * and the Service element to get a list of every available service. */
    private com.fedex.ws.packagemovementinformationservice.v5.PackagingType packaging;

    public ServiceAvailabilityRequest() {
    }

    public ServiceAvailabilityRequest(
           com.fedex.ws.packagemovementinformationservice.v5.WebAuthenticationDetail webAuthenticationDetail,
           com.fedex.ws.packagemovementinformationservice.v5.ClientDetail clientDetail,
           com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail transactionDetail,
           com.fedex.ws.packagemovementinformationservice.v5.VersionId version,
           com.fedex.ws.packagemovementinformationservice.v5.Address origin,
           com.fedex.ws.packagemovementinformationservice.v5.Address destination,
           java.util.Date shipDate,
           com.fedex.ws.packagemovementinformationservice.v5.CarrierCodeType carrierCode,
           com.fedex.ws.packagemovementinformationservice.v5.ServiceType service,
           com.fedex.ws.packagemovementinformationservice.v5.PackagingType packaging) {
           this.webAuthenticationDetail = webAuthenticationDetail;
           this.clientDetail = clientDetail;
           this.transactionDetail = transactionDetail;
           this.version = version;
           this.origin = origin;
           this.destination = destination;
           this.shipDate = shipDate;
           this.carrierCode = carrierCode;
           this.service = service;
           this.packaging = packaging;
    }


    /**
     * Gets the webAuthenticationDetail value for this ServiceAvailabilityRequest.
     * 
     * @return webAuthenticationDetail   * Descriptive data to be used in authentication of the sender's
     * identity (and right to use FedEx web services).
     */
    public com.fedex.ws.packagemovementinformationservice.v5.WebAuthenticationDetail getWebAuthenticationDetail() {
        return webAuthenticationDetail;
    }


    /**
     * Sets the webAuthenticationDetail value for this ServiceAvailabilityRequest.
     * 
     * @param webAuthenticationDetail   * Descriptive data to be used in authentication of the sender's
     * identity (and right to use FedEx web services).
     */
    public void setWebAuthenticationDetail(com.fedex.ws.packagemovementinformationservice.v5.WebAuthenticationDetail webAuthenticationDetail) {
        this.webAuthenticationDetail = webAuthenticationDetail;
    }


    /**
     * Gets the clientDetail value for this ServiceAvailabilityRequest.
     * 
     * @return clientDetail   * The descriptive data identifying the client submitting the
     * transaction.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.ClientDetail getClientDetail() {
        return clientDetail;
    }


    /**
     * Sets the clientDetail value for this ServiceAvailabilityRequest.
     * 
     * @param clientDetail   * The descriptive data identifying the client submitting the
     * transaction.
     */
    public void setClientDetail(com.fedex.ws.packagemovementinformationservice.v5.ClientDetail clientDetail) {
        this.clientDetail = clientDetail;
    }


    /**
     * Gets the transactionDetail value for this ServiceAvailabilityRequest.
     * 
     * @return transactionDetail   * The descriptive data for this customer transaction. The TransactionDetail
     * from the request is echoed back to the caller in the corresponding
     * reply.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail getTransactionDetail() {
        return transactionDetail;
    }


    /**
     * Sets the transactionDetail value for this ServiceAvailabilityRequest.
     * 
     * @param transactionDetail   * The descriptive data for this customer transaction. The TransactionDetail
     * from the request is echoed back to the caller in the corresponding
     * reply.
     */
    public void setTransactionDetail(com.fedex.ws.packagemovementinformationservice.v5.TransactionDetail transactionDetail) {
        this.transactionDetail = transactionDetail;
    }


    /**
     * Gets the version value for this ServiceAvailabilityRequest.
     * 
     * @return version   * Identifies the version/level of a service operation expected
     * by a caller (in each request) and performed by the callee (in each
     * reply).
     */
    public com.fedex.ws.packagemovementinformationservice.v5.VersionId getVersion() {
        return version;
    }


    /**
     * Sets the version value for this ServiceAvailabilityRequest.
     * 
     * @param version   * Identifies the version/level of a service operation expected
     * by a caller (in each request) and performed by the callee (in each
     * reply).
     */
    public void setVersion(com.fedex.ws.packagemovementinformationservice.v5.VersionId version) {
        this.version = version;
    }


    /**
     * Gets the origin value for this ServiceAvailabilityRequest.
     * 
     * @return origin   * The descriptive data for the physical location from which the
     * shipment originates.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.Address getOrigin() {
        return origin;
    }


    /**
     * Sets the origin value for this ServiceAvailabilityRequest.
     * 
     * @param origin   * The descriptive data for the physical location from which the
     * shipment originates.
     */
    public void setOrigin(com.fedex.ws.packagemovementinformationservice.v5.Address origin) {
        this.origin = origin;
    }


    /**
     * Gets the destination value for this ServiceAvailabilityRequest.
     * 
     * @return destination   * The descriptive data for the physical location to which the
     * shipment is destined.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.Address getDestination() {
        return destination;
    }


    /**
     * Sets the destination value for this ServiceAvailabilityRequest.
     * 
     * @param destination   * The descriptive data for the physical location to which the
     * shipment is destined.
     */
    public void setDestination(com.fedex.ws.packagemovementinformationservice.v5.Address destination) {
        this.destination = destination;
    }


    /**
     * Gets the shipDate value for this ServiceAvailabilityRequest.
     * 
     * @return shipDate   * The date on which the package will be shipped. The date should
     * not  be a past date or a date more than 10 days in the future. The
     * date format must be YYYY-MM-DD.
     */
    public java.util.Date getShipDate() {
        return shipDate;
    }


    /**
     * Sets the shipDate value for this ServiceAvailabilityRequest.
     * 
     * @param shipDate   * The date on which the package will be shipped. The date should
     * not  be a past date or a date more than 10 days in the future. The
     * date format must be YYYY-MM-DD.
     */
    public void setShipDate(java.util.Date shipDate) {
        this.shipDate = shipDate;
    }


    /**
     * Gets the carrierCode value for this ServiceAvailabilityRequest.
     * 
     * @return carrierCode   * Optionally supplied instead of service to restrict reply to
     * services for a specific carrier.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.CarrierCodeType getCarrierCode() {
        return carrierCode;
    }


    /**
     * Sets the carrierCode value for this ServiceAvailabilityRequest.
     * 
     * @param carrierCode   * Optionally supplied instead of service to restrict reply to
     * services for a specific carrier.
     */
    public void setCarrierCode(com.fedex.ws.packagemovementinformationservice.v5.CarrierCodeType carrierCode) {
        this.carrierCode = carrierCode;
    }


    /**
     * Gets the service value for this ServiceAvailabilityRequest.
     * 
     * @return service   * Restricts reply to single service, if supplied.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.ServiceType getService() {
        return service;
    }


    /**
     * Sets the service value for this ServiceAvailabilityRequest.
     * 
     * @param service   * Restricts reply to single service, if supplied.
     */
    public void setService(com.fedex.ws.packagemovementinformationservice.v5.ServiceType service) {
        this.service = service;
    }


    /**
     * Gets the packaging value for this ServiceAvailabilityRequest.
     * 
     * @return packaging   * Identifies the FedEx packaging type used by the requestor for
     * the package. See PackagingType for valid values. Omit this element
     * and the Service element to get a list of every available service.
     */
    public com.fedex.ws.packagemovementinformationservice.v5.PackagingType getPackaging() {
        return packaging;
    }


    /**
     * Sets the packaging value for this ServiceAvailabilityRequest.
     * 
     * @param packaging   * Identifies the FedEx packaging type used by the requestor for
     * the package. See PackagingType for valid values. Omit this element
     * and the Service element to get a list of every available service.
     */
    public void setPackaging(com.fedex.ws.packagemovementinformationservice.v5.PackagingType packaging) {
        this.packaging = packaging;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ServiceAvailabilityRequest)) return false;
        ServiceAvailabilityRequest other = (ServiceAvailabilityRequest) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.webAuthenticationDetail==null && other.getWebAuthenticationDetail()==null) || 
             (this.webAuthenticationDetail!=null &&
              this.webAuthenticationDetail.equals(other.getWebAuthenticationDetail()))) &&
            ((this.clientDetail==null && other.getClientDetail()==null) || 
             (this.clientDetail!=null &&
              this.clientDetail.equals(other.getClientDetail()))) &&
            ((this.transactionDetail==null && other.getTransactionDetail()==null) || 
             (this.transactionDetail!=null &&
              this.transactionDetail.equals(other.getTransactionDetail()))) &&
            ((this.version==null && other.getVersion()==null) || 
             (this.version!=null &&
              this.version.equals(other.getVersion()))) &&
            ((this.origin==null && other.getOrigin()==null) || 
             (this.origin!=null &&
              this.origin.equals(other.getOrigin()))) &&
            ((this.destination==null && other.getDestination()==null) || 
             (this.destination!=null &&
              this.destination.equals(other.getDestination()))) &&
            ((this.shipDate==null && other.getShipDate()==null) || 
             (this.shipDate!=null &&
              this.shipDate.equals(other.getShipDate()))) &&
            ((this.carrierCode==null && other.getCarrierCode()==null) || 
             (this.carrierCode!=null &&
              this.carrierCode.equals(other.getCarrierCode()))) &&
            ((this.service==null && other.getService()==null) || 
             (this.service!=null &&
              this.service.equals(other.getService()))) &&
            ((this.packaging==null && other.getPackaging()==null) || 
             (this.packaging!=null &&
              this.packaging.equals(other.getPackaging())));
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
        if (getWebAuthenticationDetail() != null) {
            _hashCode += getWebAuthenticationDetail().hashCode();
        }
        if (getClientDetail() != null) {
            _hashCode += getClientDetail().hashCode();
        }
        if (getTransactionDetail() != null) {
            _hashCode += getTransactionDetail().hashCode();
        }
        if (getVersion() != null) {
            _hashCode += getVersion().hashCode();
        }
        if (getOrigin() != null) {
            _hashCode += getOrigin().hashCode();
        }
        if (getDestination() != null) {
            _hashCode += getDestination().hashCode();
        }
        if (getShipDate() != null) {
            _hashCode += getShipDate().hashCode();
        }
        if (getCarrierCode() != null) {
            _hashCode += getCarrierCode().hashCode();
        }
        if (getService() != null) {
            _hashCode += getService().hashCode();
        }
        if (getPackaging() != null) {
            _hashCode += getPackaging().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ServiceAvailabilityRequest.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityRequest"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("webAuthenticationDetail");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "WebAuthenticationDetail"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "WebAuthenticationDetail"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("clientDetail");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ClientDetail"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ClientDetail"));
        elemField.setNillable(false);
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
        elemField.setFieldName("origin");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Origin"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Address"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("destination");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Destination"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Address"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("shipDate");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ShipDate"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "date"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("carrierCode");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "CarrierCode"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "CarrierCodeType"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("service");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Service"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceType"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("packaging");
        elemField.setXmlName(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "Packaging"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PackagingType"));
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
