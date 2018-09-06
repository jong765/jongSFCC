/**
 * PackageMovementInformationServiceSoapBindingSkeleton.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package com.fedex.ws.packagemovementinformationservice.v5;

public class PackageMovementInformationServiceSoapBindingSkeleton implements com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationPortType, org.apache.axis.wsdl.Skeleton {
    private com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationPortType impl;
    private static java.util.Map _myOperations = new java.util.Hashtable();
    private static java.util.Collection _myOperationsList = new java.util.ArrayList();

    /**
    * Returns List of OperationDesc objects with this name
    */
    public static java.util.List getOperationDescByName(java.lang.String methodName) {
        return (java.util.List)_myOperations.get(methodName);
    }

    /**
    * Returns Collection of OperationDescs
    */
    public static java.util.Collection getOperationDescs() {
        return _myOperationsList;
    }

    static {
        org.apache.axis.description.OperationDesc _oper;
        org.apache.axis.description.FaultDesc _fault;
        org.apache.axis.description.ParameterDesc [] _params;
        _params = new org.apache.axis.description.ParameterDesc [] {
            new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeInquiryRequest"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeInquiryRequest"), com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryRequest.class, false, false), 
        };
        _oper = new org.apache.axis.description.OperationDesc("postalCodeInquiry", _params, new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeInquiryReply"));
        _oper.setReturnType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "PostalCodeInquiryReply"));
        _oper.setElementQName(new javax.xml.namespace.QName("", "postalCodeInquiry"));
        _oper.setSoapAction("postalCodeInquiry");
        _myOperationsList.add(_oper);
        if (_myOperations.get("postalCodeInquiry") == null) {
            _myOperations.put("postalCodeInquiry", new java.util.ArrayList());
        }
        ((java.util.List)_myOperations.get("postalCodeInquiry")).add(_oper);
        _params = new org.apache.axis.description.ParameterDesc [] {
            new org.apache.axis.description.ParameterDesc(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityRequest"), org.apache.axis.description.ParameterDesc.IN, new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityRequest"), com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityRequest.class, false, false), 
        };
        _oper = new org.apache.axis.description.OperationDesc("serviceAvailability", _params, new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityReply"));
        _oper.setReturnType(new javax.xml.namespace.QName("http://fedex.com/ws/packagemovementinformationservice/v5", "ServiceAvailabilityReply"));
        _oper.setElementQName(new javax.xml.namespace.QName("", "serviceAvailability"));
        _oper.setSoapAction("serviceAvailability");
        _myOperationsList.add(_oper);
        if (_myOperations.get("serviceAvailability") == null) {
            _myOperations.put("serviceAvailability", new java.util.ArrayList());
        }
        ((java.util.List)_myOperations.get("serviceAvailability")).add(_oper);
    }

    public PackageMovementInformationServiceSoapBindingSkeleton() {
        this.impl = new com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationServiceSoapBindingImpl();
    }

    public PackageMovementInformationServiceSoapBindingSkeleton(com.fedex.ws.packagemovementinformationservice.v5.PackageMovementInformationPortType impl) {
        this.impl = impl;
    }
    public com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryReply postalCodeInquiry(com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryRequest postalCodeInquiryRequest) throws java.rmi.RemoteException
    {
        com.fedex.ws.packagemovementinformationservice.v5.PostalCodeInquiryReply ret = impl.postalCodeInquiry(postalCodeInquiryRequest);
        return ret;
    }

    public com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityReply serviceAvailability(com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityRequest serviceAvailabilityRequest) throws java.rmi.RemoteException
    {
        com.fedex.ws.packagemovementinformationservice.v5.ServiceAvailabilityReply ret = impl.serviceAvailability(serviceAvailabilityRequest);
        return ret;
    }

}
